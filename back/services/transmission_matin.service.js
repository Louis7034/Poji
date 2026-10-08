import { db } from "../prisma/db.ts";
import pool from "../db/database.js";
import JournalService from "./journal.service.js";

const selectFields = `
    id,
    contenu,
    heure_couche AS "heureCouche",
    heure_reveille AS "heureReveille",
    observation,
    repas,
    comportement,
    created_at AS "createdAt",
    auteur_id AS "auteurId",
    enfant_id AS "enfantId"
`;

const fields = ["heureCouche", "heureReveille", "observation", "repas", "comportement"];

function parseTransmission(row) {
    const legacyContent = row.contenu;
    delete row.contenu;
    if (legacyContent) {
        try {
            const parsed = JSON.parse(legacyContent);
            if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
                const populatedFields = Object.fromEntries(
                    Object.entries(row).filter(([key, value]) => key !== "contenu" && value !== null && value !== undefined),
                );
                return { ...parsed, ...populatedFields };
            }
        } catch {
            if (row.observation == null) row.observation = legacyContent;
        }
    }
    return row;
}

const TransmissionMatinService = {
    async getAll() {
        return await db.orm.public.TransmissionMatin.all();
    },

    async getByEnfant(enfantId) {
        await JournalService.ensureDailyTransmission(enfantId, "matin");
        const result = await pool.query(`
            SELECT ${selectFields}
            FROM transmission_matin
            WHERE enfant_id = $1
            ORDER BY created_at DESC
        `, [enfantId]);
        return result.rows.map(parseTransmission);
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
        const values = fields.filter((field) => data[field] !== undefined);
        if (values.length === 0) throw new Error("Aucun champ de transmission du matin à mettre à jour");
        const columns = {
            heureCouche: "heure_couche",
            heureReveille: "heure_reveille",
            observation: "observation",
            repas: "repas",
            comportement: "comportement",
        };
        const assignments = values.map((field, index) => `"${columns[field]}" = $${index + 1}`);
        const parameters = values.map((field) => data[field]);
        parameters.push(id);

        const result = await pool.query(`
            UPDATE transmission_matin
            SET ${assignments.join(", ")}
            WHERE id = $${parameters.length}
            RETURNING ${selectFields}
        `, parameters);
        if (result.rowCount === 0) throw new Error("Transmission du matin introuvable");
        return parseTransmission(result.rows[0]);
    },

    async delete(id) {
        return await db.orm.public.TransmissionMatin.where({ id }).delete();
    },
};

export default TransmissionMatinService;
