import { db } from "../prisma/db.ts";
import pool from "../db/database.js";

const JournalService = {
    async getAll() {
        return await db.orm.public.Journal.all();
    },

    async getByEnfant(enfantId) {
        const result = await pool.query(`
            SELECT journal.id, journal.nom, journal.created_at AS "createdAt",
                COALESCE(json_agg(DISTINCT jsonb_build_object(
                    'id', tm.id, 'heureCouche', tm.heure_couche, 'heureReveille', tm.heure_reveille,
                    'observation', tm.observation, 'repas', tm.repas, 'comportement', tm.comportement,
                    'journalId', tm.journal_id, 'auteurId', tm.auteur_id
                )) FILTER (WHERE tm.id IS NOT NULL), '[]') AS "transmissionsMatin",
                COALESCE(json_agg(DISTINCT jsonb_build_object(
                    'id', ts.id, 'depart', ts.depart, 'arrivee', ts.arrivee,
                    'observation', ts.observation, 'evenement', ts.evenement, 'besoin', ts.besoin,
                    'journalId', ts.journal_id, 'auteurId', ts.auteur_id
                )) FILTER (WHERE ts.id IS NOT NULL), '[]') AS "transmissionsSoir"
            FROM journal
            LEFT JOIN transmission_matin tm ON tm.journal_id = journal.id
            LEFT JOIN transmission_soir ts ON ts.journal_id = journal.id
            WHERE journal.enfant_id = $1
            GROUP BY journal.id
            ORDER BY journal.created_at DESC
        `, [enfantId]);
        return result.rows;
    },

    async getById(id) {
        const journal = await db.orm.public.Journal.where({ id }).first();
        if (!journal) throw new Error("Journal introuvable");
        return journal;
    },

    async create(data) {
        return await db.orm.public.Journal.create(data);
    },

    async update(id, data) {
        return await db.orm.public.Journal.update(id, data);
    },

    async delete(id) {
        return await db.orm.public.Journal.delete(id);
    },
};

export default JournalService;