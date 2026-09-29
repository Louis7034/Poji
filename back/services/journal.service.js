import { db } from "../prisma/db.ts";
import pool from "../db/database.js";
import { randomUUID } from "node:crypto";

function parseTransmission(transmission) {
    let contenu = {};
    if (transmission.contenu) {
        try {
            const parsed = JSON.parse(transmission.contenu);
            if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
                contenu = parsed;
            }
        } catch {
            contenu = { observation: transmission.contenu };
        }
    }
    return { ...transmission, ...contenu };
}

const JournalService = {
    async ensureDailyTransmission(enfantId, type) {
        const table = type === "matin" ? "transmission_matin" : "transmission_soir";
        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            const journalResult = await client.query(`
                SELECT id
                FROM journal
                WHERE enfant_id = $1
                  AND created_at >= (CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris')::date
                  AND created_at < (CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris')::date + INTERVAL '1 day'
                ORDER BY created_at DESC
                LIMIT 1
            `, [enfantId]);

            if (journalResult.rowCount === 0) {
                await client.query(`
                    INSERT INTO journal (id, nom, enfant_id)
                    VALUES ($1, $2, $3)
                `, [
                    randomUUID(),
                    `Transmission du ${new Date().toLocaleDateString("fr-FR")}`,
                    enfantId,
                ]);
            }

            const existingResult = await client.query(`
                SELECT id
                FROM ${table}
                WHERE enfant_id = $1
                  AND created_at >= (CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris')::date
                  AND created_at < (CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris')::date + INTERVAL '1 day'
                LIMIT 1
            `, [enfantId]);

            if (existingResult.rowCount === 0) {
                await client.query(
                    `INSERT INTO ${table} (id, enfant_id) VALUES ($1, $2)`,
                    [randomUUID(), enfantId],
                );
            }

            await client.query("COMMIT");
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    },

    async getAll() {
        return await db.orm.public.Journal.all();
    },

    async getByEnfant(enfantId) {
        const result = await pool.query(`
            SELECT
                journal.id,
                journal.nom,
                journal.created_at AS "createdAt",
                COALESCE(matin.transmissions, '[]'::json) AS "transmissionsMatin",
                COALESCE(soir.transmissions, '[]'::json) AS "transmissionsSoir",
                COALESCE(sante.problemes, '[]'::json) AS "problemesSante"
            FROM journal
            LEFT JOIN LATERAL (
                SELECT json_agg(json_build_object(
                    'id', transmission_matin.id,
                    'contenu', transmission_matin.contenu,
                    'createdAt', transmission_matin.created_at,
                    'auteurId', transmission_matin.auteur_id,
                    'enfantId', transmission_matin.enfant_id
                ) ORDER BY transmission_matin.created_at DESC) AS transmissions
                FROM transmission_matin
                WHERE transmission_matin.enfant_id = journal.enfant_id
                  AND transmission_matin.created_at >= journal.created_at::date
                  AND transmission_matin.created_at < journal.created_at::date + INTERVAL '1 day'
            ) matin ON true
            LEFT JOIN LATERAL (
                SELECT json_agg(json_build_object(
                    'id', transmission_soir.id,
                    'contenu', transmission_soir.contenu,
                    'createdAt', transmission_soir.created_at,
                    'auteurId', transmission_soir.auteur_id,
                    'enfantId', transmission_soir.enfant_id
                ) ORDER BY transmission_soir.created_at DESC) AS transmissions
                FROM transmission_soir
                WHERE transmission_soir.enfant_id = journal.enfant_id
                  AND transmission_soir.created_at >= journal.created_at::date
                  AND transmission_soir.created_at < journal.created_at::date + INTERVAL '1 day'
            ) soir ON true
            LEFT JOIN LATERAL (
                SELECT json_agg(json_build_object(
                    'id', probleme_sante.id,
                    'description', probleme_sante.description,
                    'dateDebut', probleme_sante.date_debut,
                    'dateFin', probleme_sante.date_fin,
                    'auteurId', probleme_sante.auteur_id,
                    'enfantId', probleme_sante.enfant_id
                ) ORDER BY probleme_sante.created_at DESC) AS problemes
                FROM probleme_sante
                WHERE probleme_sante.enfant_id = journal.enfant_id
                  AND probleme_sante.date_debut <= journal.created_at::date
                  AND (
                      probleme_sante.date_fin IS NULL
                      OR probleme_sante.date_fin >= journal.created_at::date
                  )
            ) sante ON true
            WHERE journal.enfant_id = $1
            ORDER BY journal.created_at DESC
        `, [enfantId]);
        return result.rows.map((journal) => ({
            ...journal,
            transmissionsMatin: journal.transmissionsMatin.map(parseTransmission),
            transmissionsSoir: journal.transmissionsSoir.map(parseTransmission),
            problemesSante: journal.problemesSante.map((probleme) => ({
                ...probleme,
                symptome: probleme.description,
                traitement: null,
                observation: null,
            })),
        }));
    },

    async getById(id) {
        const journal = await db.orm.public.Journal.where({ id }).first();
        if (!journal) throw new Error("Journal introuvable");
        return journal;
    },

    async create(data) {
        return await db.orm.public.Journal.create(data);
    },

    async update(id, data) {
        return await db.orm.public.Journal.update(id, data);
    },

    async delete(id) {
        return await db.orm.public.Journal.delete(id);
    },
};

export default JournalService;
