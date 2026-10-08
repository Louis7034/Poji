import { db } from "../prisma/db.ts";
import pool from "../db/database.js";
import JournalService from "./journal.service.js";

const selectFields = `
    id,
    depart,
    arrivee,
    observation,
    evenement,
    besoin,
    created_at AS "createdAt",
    auteur_id AS "auteurId",
    enfant_id AS "enfantId"
`;

const fields = ["depart", "arrivee", "observation", "evenement", "besoin"];

function parseTransmission(row) {
    return row;
}

const TransmissionSoirService = {
    async getAll() {
        return await db.orm.public.TransmissionSoir.all();
    },

    async getByEnfant(enfantId) {
        await JournalService.ensureDailyTransmission(enfantId, "soir");
        const result = await pool.query(`
            SELECT ${selectFields}
            FROM transmission_soir
            WHERE enfant_id = $1
            ORDER BY created_at DESC
        `, [enfantId]);
        return result.rows.map(parseTransmission);
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
        const values = fields.filter((field) => data[field] !== undefined);
        if (values.length === 0) throw new Error("Aucun champ de transmission du soir à mettre à jour");
        const columns = {
            depart: "depart",
            arrivee: "arrivee",
            observation: "observation",
            evenement: "evenement",
            besoin: "besoin",
        };
        const assignments = values.map((field, index) => `"${columns[field]}" = $${index + 1}`);
        const parameters = values.map((field) => data[field]);
        parameters.push(id);

        const result = await pool.query(`
            UPDATE transmission_soir
            SET ${assignments.join(", ")}
            WHERE id = $${parameters.length}
            RETURNING ${selectFields}
        `, parameters);
        if (result.rowCount === 0) throw new Error("Transmission du soir introuvable");
        return parseTransmission(result.rows[0]);
    },

    async delete(id) {
        return await db.orm.public.TransmissionSoir.where({ id }).delete();
    },
};

export default TransmissionSoirService;
