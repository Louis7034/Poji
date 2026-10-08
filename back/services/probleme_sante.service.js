import { db } from "../prisma/db.ts";
import pool from "../db/database.js";
import { randomUUID } from "node:crypto";

const today = "(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris')::date";

const selectFields = `
    id,
    description AS symptome,
    traitement,
    observation,
    date_debut AS "dateDebut",
    date_fin AS "dateFin",
    created_at AS "createdAt",
    auteur_id AS "auteurId",
    enfant_id AS "enfantId"
`;

const ProblemeSanteService = {
    async getByEnfantToday(enfantId) {
        const result = await pool.query(`
            SELECT ${selectFields}
            FROM probleme_sante
            WHERE enfant_id = $1
              AND date_debut = ${today}
            ORDER BY created_at DESC
            LIMIT 1
        `, [enfantId]);
        return result.rows[0] ?? null;
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
            SET description = $1, date_debut = $2, date_fin = $3
            WHERE id = $4
            RETURNING ${selectFields}
        `, [data.description ?? data.symptome ?? null, data.dateDebut ?? null, data.dateFin ?? null, id]);
        if (result.rowCount === 0) throw new Error("Problème de santé introuvable");
        return result.rows[0];
    },

    async create(data) {
        const result = await pool.query(`
            INSERT INTO probleme_sante (
                id, description, traitement, observation, date_debut, enfant_id
            )
            VALUES ($1, $2, $3, $4, ${today}, $5)
            RETURNING ${selectFields}
        `, [
            randomUUID(),
            data.symptome ?? data.description ?? null,
            data.traitement ?? null,
            data.observation ?? null,
            data.enfantId,
        ]);
        return result.rows[0];
    },

    async update(id, data) {
        const result = await pool.query(`
            UPDATE probleme_sante
            SET description = $1, traitement = $2, observation = $3
            WHERE id = $4
            RETURNING ${selectFields}
        `, [
            data.symptome ?? data.description ?? null,
            data.traitement ?? null,
            data.observation ?? null,
            id,
        ]);
        if (result.rowCount === 0) throw new Error("Problème de santé introuvable");
        return result.rows[0];
    },

    async delete(id) {
        return await db.orm.public.ProblemeSante.where({ id }).delete();
    },
};

export default ProblemeSanteService;
