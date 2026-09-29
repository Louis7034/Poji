import { db } from "../prisma/db.ts";
import pool from "../db/database.js";
import { randomUUID } from "node:crypto";
import JournalService from "./journal.service.js";

const ProblemeSanteService = {
    async getByEnfantToday(enfantId) {
        await JournalService.ensureDailyTransmission(enfantId, "matin");
        const result = await pool.query(`
            SELECT probleme_sante.id, probleme_sante.symptome, probleme_sante.traitement,
                   probleme_sante.observation, probleme_sante.transmission_matin_id AS "transmissionMatinId",
                   probleme_sante.transmission_soir_id AS "transmissionSoirId"
            FROM probleme_sante
            INNER JOIN journal
                ON journal.id = COALESCE(
                    (SELECT journal_id FROM transmission_matin WHERE id = probleme_sante.transmission_matin_id),
                    (SELECT journal_id FROM transmission_soir WHERE id = probleme_sante.transmission_soir_id)
                )
            WHERE journal.enfant_id = $1
              AND journal.created_at >= CURRENT_DATE
              AND journal.created_at < CURRENT_DATE + INTERVAL '1 day'
            ORDER BY probleme_sante.id
            LIMIT 1
        `, [enfantId]);

        if (result.rows.length > 0) {
            return result.rows[0];
        }

        const transmission = await pool.query(`
            SELECT transmission_matin.id
            FROM transmission_matin
            INNER JOIN journal ON journal.id = transmission_matin.journal_id
            WHERE journal.enfant_id = $1
              AND journal.created_at >= CURRENT_DATE
              AND journal.created_at < CURRENT_DATE + INTERVAL '1 day'
            LIMIT 1
        `, [enfantId]);
        const id = randomUUID();
        const created = await pool.query(`
            INSERT INTO probleme_sante (id, transmission_matin_id)
            VALUES ($1, $2)
            RETURNING id, symptome, traitement, observation,
                      transmission_matin_id AS "transmissionMatinId",
                      transmission_soir_id AS "transmissionSoirId"
        `, [id, transmission.rows[0].id]);
        return created.rows[0];
    },

    async getAll() {
        return await db.orm.public.ProblemeSante.all();
    },

    async getById(id) {
        const probleme = await db.orm.public.ProblemeSante.where({ id }).first();
        if (!probleme) throw new Error("Problème de santé introuvable");
        return probleme;
    },

    async updateDaily(id, data) {
        const result = await pool.query(`
            UPDATE probleme_sante
            SET symptome = $1, traitement = $2, observation = $3
            WHERE id = $4
            RETURNING id, symptome, traitement, observation,
                      transmission_matin_id AS "transmissionMatinId",
                      transmission_soir_id AS "transmissionSoirId"
        `, [data.symptome ?? null, data.traitement ?? null, data.observation ?? null, id]);
        if (result.rowCount === 0) throw new Error("Problème de santé introuvable");
        return result.rows[0];
    },

    async create(data) {
        return await db.orm.public.ProblemeSante.create(data);
    },

    async update(id, data) {
        return await db.orm.public.ProblemeSante.update(id, data);
    },

    async delete(id) {
        return await db.orm.public.ProblemeSante.delete(id);
    },
};

export default ProblemeSanteService;