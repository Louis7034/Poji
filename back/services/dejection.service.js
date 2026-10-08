import { db } from "../prisma/db.ts";
import pool from "../db/database.js";
import { randomUUID } from "node:crypto";

export const dejectionService = {

    async getDejection(enfantId) {
        const result = await pool.query(`
            SELECT
                dejection.id,
                dejection.type,
                dejection.heure,
                dejection.commentaire,
                dejection.created_at AS "createdAt",
                dejection.enfant_id AS "enfantId"
            FROM dejection
            WHERE dejection.enfant_id = $1
              AND dejection.created_at >= (CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris')::date
              AND dejection.created_at < (CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Paris')::date + INTERVAL '1 day'
            ORDER BY dejection.heure DESC NULLS LAST, dejection.created_at DESC
        `, [enfantId]);
        return result.rows;
    },

    async getDejectionById(id) {
        const dejection = await db.orm.public.Dejection
            .where({ id })
            .first();

        if (!dejection) {
            throw new Error("Déjection introuvable");
        }

        return dejection;
    },

    async createDejection(data) {
        const result = await pool.query(`
            INSERT INTO dejection (id, type, heure, commentaire, enfant_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, type, heure, commentaire, created_at AS "createdAt", enfant_id AS "enfantId"
        `, [
            randomUUID(),
            data.type,
            data.heure,
            data.commentaire ?? null,
            data.enfantId,
        ]);
        return result.rows[0];
    },

    async updateDejection(id, data) {
        return await db.orm.public.Dejection
            .where({ id })
            .update(data);
    },

    async deleteDejection(id) {
        return await db.orm.public.Dejection
            .where({ id })
            .delete();
    },
};