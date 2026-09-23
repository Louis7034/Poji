import { db } from "../prisma/db.ts";
import pool from "../db/database.js";

const TransmissionSoirService = {
    async getAll() {
        return await db.orm.public.TransmissionSoir.all();
    },

    async getByEnfant(enfantId) {
        const result = await pool.query(`
            SELECT
                transmission_soir.id,
                transmission_soir.depart,
                transmission_soir.arrivee,
                transmission_soir.observation,
                transmission_soir.evenement,
                transmission_soir.besoin,
                transmission_soir.journal_id AS "journalId",
                transmission_soir.auteur_id AS "auteurId"
            FROM transmission_soir
            INNER JOIN journal
                ON journal.id = transmission_soir.journal_id
            WHERE journal.enfant_id = $1
            ORDER BY journal.created_at DESC
        `, [enfantId]);

        return result.rows;
    },

    async getById(id) {
        const transmission = await db.orm.public.TransmissionSoir.where({ id }).first();
        if (!transmission) throw new Error("Transmission du soir introuvable");
        return transmission;
    },

    async create(data) {
        return await db.orm.public.TransmissionSoir.create(data);
    },

    async update(id, data) {
        const fields = {
            depart: "depart",
            arrivee: "arrivee",
            observation: "observation",
            evenement: "evenement",
            besoin: "besoin",
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
            `UPDATE transmission_soir
             SET ${assignments.join(", ")}
             WHERE id = $${values.length}
             RETURNING
                id,
                depart,
                arrivee,
                observation,
                evenement,
                besoin,
                journal_id AS "journalId",
                auteur_id AS "auteurId"`,
            values,
        );

        if (result.rowCount === 0) {
            throw new Error("Transmission du soir introuvable");
        }

        return result.rows[0];
    },

    async delete(id) {
        return await db.orm.public.TransmissionSoir.delete(id);
    },
};

export default TransmissionSoirService;