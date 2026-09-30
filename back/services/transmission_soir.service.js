import { db } from "../prisma/db.ts";
import pool from "../db/database.js";
import JournalService from "./journal.service.js";

const selectFields = `
    id,
    contenu,
    created_at AS "createdAt",
    auteur_id AS "auteurId",
    enfant_id AS "enfantId"
`;

const fields = ["depart", "arrivee", "observation", "evenement", "besoin"];

function parseTransmission(row) {
    let contenu = {};
    if (row.contenu) {
        try {
            const parsed = JSON.parse(row.contenu);
            if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
                contenu = parsed;
            }
        } catch {
            contenu = { observation: row.contenu };
        }
    }
    return { ...row, ...contenu };
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
        const current = await pool.query(
            `SELECT contenu FROM transmission_soir WHERE id = $1`,
            [id],
        );
        if (current.rowCount === 0) throw new Error("Transmission du soir introuvable");

        let contenu = {};
        try {
            const parsed = JSON.parse(current.rows[0].contenu ?? "{}");
            if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) contenu = parsed;
        } catch {
            contenu = { observation: current.rows[0].contenu };
        }
        for (const field of fields) {
            if (data[field] !== undefined) contenu[field] = data[field];
        }

        const result = await pool.query(`
            UPDATE transmission_soir
            SET contenu = $1
            WHERE id = $2
            RETURNING ${selectFields}
        `, [JSON.stringify(contenu), id]);
        if (result.rowCount === 0) throw new Error("Transmission du soir introuvable");
        return parseTransmission(result.rows[0]);
    },

    async delete(id) {
        return await db.orm.public.TransmissionSoir.where({ id }).delete();
    },
};

export default TransmissionSoirService;
