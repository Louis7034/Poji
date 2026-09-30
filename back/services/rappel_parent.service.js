import { db } from "../prisma/db.ts";
import pool from "../db/database.js";
import { randomUUID } from "node:crypto";

const RappelParentService = {
    async getAll() {
        const result = await pool.query(`
            SELECT
                rappel_parent.id,
                rappel_parent.sujet,
                rappel_parent.contenu AS message,
                rappel_parent.created_at AS "dateCreation",
                rappel_parent.auteur_id AS "auteurId",
                rappel_parent.enfant_id AS "enfantId",
                enfant.prenom AS "prenomEnfant"
            FROM rappel_parent
            LEFT JOIN enfant ON enfant.id = rappel_parent.enfant_id
            ORDER BY rappel_parent.created_at DESC
        `);
        return result.rows;
    },

    async getById(id) {
        const rappel = await db.orm.public.RappelParent.where({ id }).first();
        if (!rappel) throw new Error("Rappel parent introuvable");
        return rappel;
    },

    async create(data) {
        const result = await pool.query(`
            INSERT INTO rappel_parent (id, sujet, contenu, auteur_id, enfant_id)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, sujet, contenu AS message, created_at AS "dateCreation",
                      auteur_id AS "auteurId", enfant_id AS "enfantId"
        `, [randomUUID(), data.sujet ?? null, data.contenu ?? data.message ?? null, data.auteurId ?? null, data.enfantId]);
        return result.rows[0];
    },

    async update(id, data) {
        return await db.orm.public.RappelParent
            .where({ id })
            .update(data);
    },

    async delete(id) {
        return await db.orm.public.RappelParent.where({ id }).delete();
    },
};

export default RappelParentService;
