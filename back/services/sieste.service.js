import { db } from "../prisma/db.ts";
import pool from "../db/database.js";

const selectFields = `
    id,
    enfant_id AS "enfantId",
    heure_debut AS "heureDebut",
    heure_fin AS "heureFin",
    duree,
    observation,
    created_at AS "createdAt"
`;

function durationInMinutes(heureDebut, heureFin) {
    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)(?::[0-5]\d)?$/;
    const debut = String(heureDebut ?? "").match(timePattern);
    const fin = String(heureFin ?? "").match(timePattern);
    if (!debut || !fin) {
        throw new Error("Les heures de début et de fin doivent être au format HH:mm");
    }

    const debutMinutes = Number(debut[1]) * 60 + Number(debut[2]);
    const finMinutes = Number(fin[1]) * 60 + Number(fin[2]);
    const duree = finMinutes - debutMinutes;
    if (duree <= 0) {
        throw new Error("La durée de la sieste est invalide");
    }
    return duree;
}

function validatePayload(data) {
    if (!data?.enfantId || !data.heureDebut || !data.heureFin) {
        throw new Error("L'enfant, l'heure de début et l'heure de fin sont obligatoires");
    }
    return {
        enfantId: data.enfantId,
        heureDebut: data.heureDebut,
        heureFin: data.heureFin,
        duree: durationInMinutes(data.heureDebut, data.heureFin),
        observation: data.observation ?? null,
    };
}

const SiesteService = {
    async getAll() {
        return await db.orm.public.Sieste.all();
    },

    async getByEnfant(enfantId) {
        const result = await pool.query(`
            SELECT ${selectFields}
            FROM sieste
            WHERE enfant_id = $1
            ORDER BY created_at DESC
        `, [enfantId]);
        return result.rows;
    },

    async getById(id) {
        const result = await pool.query(`
            SELECT ${selectFields}
            FROM sieste
            WHERE id = $1
        `, [id]);
        if (result.rowCount === 0) throw new Error("Sieste introuvable");
        return result.rows[0];
    },

    async create(data) {
        const payload = validatePayload(data);
        const result = await pool.query(`
            INSERT INTO sieste (enfant_id, heure_debut, heure_fin, duree, observation)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING ${selectFields}
        `, [
            payload.enfantId,
            payload.heureDebut,
            payload.heureFin,
            payload.duree,
            payload.observation,
        ]);
        return result.rows[0];
    },

    async update(id, data) {
        const current = await SiesteService.getById(id);
        const payload = validatePayload({
            enfantId: data.enfantId ?? current.enfantId,
            heureDebut: data.heureDebut ?? current.heureDebut,
            heureFin: data.heureFin ?? current.heureFin,
            observation: data.observation === undefined ? current.observation : data.observation,
        });
        const result = await pool.query(`
            UPDATE sieste
            SET heure_debut = $1, heure_fin = $2, duree = $3, observation = $4
            WHERE id = $5
            RETURNING ${selectFields}
        `, [payload.heureDebut, payload.heureFin, payload.duree, payload.observation, id]);
        return result.rows[0];
    },

    async delete(id) {
        const result = await pool.query("DELETE FROM sieste WHERE id = $1", [id]);
        if (result.rowCount === 0) throw new Error("Sieste introuvable");
    },
};

export default SiesteService;
