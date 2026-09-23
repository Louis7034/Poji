import { db } from "../prisma/db.ts";
import pool from "../db/database.js";

const TransmissionMatinService = {
    async getAll() {
        return await db.orm.public.TransmissionMatin.all();
    },

    async getByEnfant(enfantId) {
        const result = await pool.query(`
            SELECT
                transmission_matin.id,
                transmission_matin.heure_couche AS "heureCouche",
                transmission_matin.heure_reveille AS "heureReveille",
                transmission_matin.observation,
                transmission_matin.repas,
                transmission_matin.comportement,
                transmission_matin.journal_id AS "journalId",
                transmission_matin.auteur_id AS "auteurId"
            FROM transmission_matin
            INNER JOIN journal
                ON journal.id = transmission_matin.journal_id
            WHERE journal.enfant_id = $1
            ORDER BY journal.created_at DESC
        `, [enfantId]);

        return result.rows;
    },

    async getById(id) {
        const transmission = await db.orm.public.TransmissionMatin.where({ id }).first();
        if (!transmission) throw new Error("Transmission du matin introuvable");
        return transmission;
    },

    async create(data) {
        return await db.orm.public.TransmissionMatin.create(data);
    },

    async update(id, data) {
        const fields = {
            heureCouche: "heure_couche",
            heureReveille: "heure_reveille",
            observation: "observation",
            repas: "repas",
            comportement: "comportement",
        };
        const entries = Object.keys(data)
            .filter((field) => fields[field])
            .map((field) => [field, fields[field]]);

        if (entries.length === 0) {
            throw new Error("Aucun champ valide à mettre à jour");
        }

        const values = [];
        const assignments = entries.map(([field, column], index) => {
            values.push(data[field]);
            return `"${column}" = $${index + 1}`;
        });
        values.push(id);

        const result = await pool.query(
            `UPDATE transmission_matin
             SET ${assignments.join(", ")}
             WHERE id = $${values.length}
             RETURNING
                id,
                heure_couche AS "heureCouche",
                heure_reveille AS "heureReveille",
                observation,
                repas,
                comportement,
                journal_id AS "journalId",
                auteur_id AS "auteurId"`,
            values,
        );

        if (result.rowCount === 0) {
            throw new Error("Transmission du matin introuvable");
        }

        return result.rows[0];
    },

    async delete(id) {
        return await db.orm.public.TransmissionMatin.delete(id);
    },
};

export default TransmissionMatinService;