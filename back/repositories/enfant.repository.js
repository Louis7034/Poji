import pool from "../db/database.js";

const EnfantRepository = {
    async getAllEnfantsWithStory() {
        const result = await pool.query(`
            SELECT
                enfant.id,
                enfant.prenom,
                enfant.date_arrive,
                enfant.created_at,
                COALESCE(
                    json_agg(
                        json_build_object(
                            'id', histoire_enfant.id,
                            'annee', histoire_enfant.annee,
                            'histoire', histoire_enfant.histoire,
                            'date_creation', histoire_enfant.date_creation,
                            'date_modification', histoire_enfant.date_modification,
                            'auteur_id', histoire_enfant.auteur_id,
                            'enfant_id', histoire_enfant.enfant_id
                        )
                        ORDER BY histoire_enfant.date_creation DESC
                    ) FILTER (WHERE histoire_enfant.id IS NOT NULL),
                    '[]'::json
                ) AS histoire_enfant
            FROM enfant
            LEFT JOIN histoire_enfant
                ON histoire_enfant.enfant_id = enfant.id
            GROUP BY enfant.id, enfant.prenom, enfant.date_arrive, enfant.created_at
            ORDER BY enfant.prenom
        `);

        return result.rows;
    }
};

export default EnfantRepository;
