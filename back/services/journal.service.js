import { db } from "../prisma/db.ts";
import pool from "../db/database.js";
import { randomUUID } from "node:crypto";

const JournalService = {
    async ensureDailyTransmission(enfantId, type) {
        const client = await pool.connect();

        try {
            await client.query("BEGIN");
            await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [enfantId]);

            const journalResult = await client.query(`
                SELECT id
                FROM journal
                WHERE enfant_id = $1
                  AND created_at >= CURRENT_DATE
                  AND created_at < CURRENT_DATE + INTERVAL '1 day'
                ORDER BY created_at DESC
                LIMIT 1
            `, [enfantId]);

            let journalId = journalResult.rows[0]?.id;
            if (!journalId) {
                journalId = randomUUID();
                await client.query(`
                    INSERT INTO journal (id, nom, created_at, enfant_id)
                    VALUES ($1, $2, CURRENT_TIMESTAMP, $3)
                `, [journalId, `Transmission du ${new Date().toLocaleDateString("fr-FR")}`, enfantId]);
            }

            const table = type === "matin" ? "transmission_matin" : "transmission_soir";
            const existingResult = await client.query(
                `SELECT id FROM ${table} WHERE journal_id = $1 LIMIT 1`,
                [journalId],
            );

            if (existingResult.rows.length === 0) {
                await client.query(
                    `INSERT INTO ${table} (id, journal_id) VALUES ($1, $2)`,
                    [randomUUID(), journalId],
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
            SELECT journal.id, journal.nom, journal.created_at AS "createdAt",
                COALESCE(json_agg(DISTINCT jsonb_build_object(
                    'id', tm.id, 'heureCouche', tm.heure_couche, 'heureReveille', tm.heure_reveille,
                    'observation', tm.observation, 'repas', tm.repas, 'comportement', tm.comportement,
                    'journalId', tm.journal_id, 'auteurId', tm.auteur_id
                )) FILTER (WHERE tm.id IS NOT NULL), '[]') AS "transmissionsMatin",
                COALESCE(json_agg(DISTINCT jsonb_build_object(
                    'id', ts.id, 'depart', ts.depart, 'arrivee', ts.arrivee,
                    'observation', ts.observation, 'evenement', ts.evenement, 'besoin', ts.besoin,
                    'journalId', ts.journal_id, 'auteurId', ts.auteur_id
                )) FILTER (WHERE ts.id IS NOT NULL), '[]') AS "transmissionsSoir",
                COALESCE(json_agg(DISTINCT jsonb_build_object(
                    'id', ps.id, 'symptome', ps.symptome, 'traitement', ps.traitement,
                    'observation', ps.observation, 'transmissionMatinId', ps.transmission_matin_id,
                    'transmissionSoirId', ps.transmission_soir_id
                )) FILTER (WHERE ps.id IS NOT NULL), '[]') AS "problemesSante"
            FROM journal
            LEFT JOIN transmission_matin tm ON tm.journal_id = journal.id
            LEFT JOIN transmission_soir ts ON ts.journal_id = journal.id
            LEFT JOIN probleme_sante ps
                ON ps.transmission_matin_id = tm.id OR ps.transmission_soir_id = ts.id
            WHERE journal.enfant_id = $1
            GROUP BY journal.id
            ORDER BY journal.created_at DESC
        `, [enfantId]);
        return result.rows;
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