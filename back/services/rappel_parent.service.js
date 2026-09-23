import { db } from "../prisma/db.ts";
import pool from "../db/database.js";

const RappelParentService = {
    async getAll() {
        const result = await pool.query(`
            SELECT
                rappel_parent.id,
                rappel_parent.message,
                rappel_parent.date_creation AS "dateCreation",
                enfant.prenom AS "prenomEnfant"
            FROM rappel_parent
            LEFT JOIN transmission_soir
                ON transmission_soir.id = rappel_parent.journee_id
            LEFT JOIN journal
                ON journal.id = transmission_soir.journal_id
            LEFT JOIN enfant
                ON enfant.id = journal.enfant_id
            ORDER BY rappel_parent.date_creation DESC
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
            INSERT INTO rappel_parent (message, journee_id)
            SELECT $1, transmission_soir.id
            FROM transmission_soir
            INNER JOIN journal
                ON journal.id = transmission_soir.journal_id
            WHERE journal.enfant_id = $2
            ORDER BY journal.created_at DESC
            LIMIT 1
            RETURNING id
        `, [data.message, data.enfantId]);

        if (result.rowCount === 0) {
            throw new Error("Aucune transmission du soir n'est disponible pour cet enfant");
        }

        const rappel = await pool.query(`
            SELECT
                rappel_parent.id,
                rappel_parent.message,
                rappel_parent.date_creation AS "dateCreation",
                enfant.prenom AS "prenomEnfant"
            FROM rappel_parent
            INNER JOIN transmission_soir
                ON transmission_soir.id = rappel_parent.journee_id
            INNER JOIN journal
                ON journal.id = transmission_soir.journal_id
            INNER JOIN enfant
                ON enfant.id = journal.enfant_id
            WHERE rappel_parent.id = $1
        `, [result.rows[0].id]);

        return rappel.rows[0];
    },

    async update(id, data) {
        return await db.orm.public.RappelParent.update(id, data);
    },

    async delete(id) {
        return await db.orm.public.RappelParent.delete(id);
    },
};

export default RappelParentService;