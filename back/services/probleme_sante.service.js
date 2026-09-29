import { db } from "../prisma/db.ts";
import pool from "../db/database.js";

const today = "(CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris')::date";

const selectFields = `
    id,
    description AS symptome,
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
