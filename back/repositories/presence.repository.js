import pool from "../db/database.js";

const PresenceRepository = {
    async countPresentToday() {
        const [presentResult, absentResult, sickResult] = await Promise.all([
            pool.query(`
                SELECT COUNT(DISTINCT enfant_id) AS nombre_enfants_presents
                FROM presence
                WHERE date_presence = CURRENT_DATE
                  AND etat_presence = 'PRESENT'
            `),
            pool.query(`
                SELECT COUNT(DISTINCT enfant_id) AS nombre_enfants_absents
                FROM presence
                WHERE date_presence = CURRENT_DATE
                  AND etat_presence = 'ABSENT'
            `),
            pool.query(`
                SELECT COUNT(DISTINCT COALESCE(journal_matin.enfant_id, journal_soir.enfant_id))
                    AS nombre_enfants_malades
                FROM probleme_sante
                LEFT JOIN transmission_matin
                    ON transmission_matin.id = probleme_sante.transmission_matin_id
                LEFT JOIN journal AS journal_matin
                    ON journal_matin.id = transmission_matin.journal_id
                LEFT JOIN transmission_soir
                    ON transmission_soir.id = probleme_sante.transmission_soir_id
                LEFT JOIN journal AS journal_soir
                    ON journal_soir.id = transmission_soir.journal_id
                WHERE probleme_sante.date_probleme = CURRENT_DATE
            `),
        ]);

        return {
            nombreEnfantsPresents: Number(presentResult.rows[0]?.nombre_enfants_presents ?? 0),
            nombreEnfantsAbsents: Number(absentResult.rows[0]?.nombre_enfants_absents ?? 0),
            nombreEnfantsMalades: Number(sickResult.rows[0]?.nombre_enfants_malades ?? 0),
        };
    },

    async getEnfantPresentToday() {
        const result = await pool.query(`
            SELECT DISTINCT
                presence.enfant_id,
                enfant.prenom,
                presence.etat_presence,
                presence.heure_arrivee
            FROM presence
            INNER JOIN enfant
                ON enfant.id = presence.enfant_id
            WHERE presence.date_presence = CURRENT_DATE
              AND presence.etat_presence IN ('PRESENT', 'PAS_ENCORE_ARRIVE')
            ORDER BY enfant.prenom
        `);

        return result.rows;
    }
};

export default PresenceRepository;
