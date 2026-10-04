import AchievementObservationGeneraleService from "../services/achievement_observation_generale.service.js";

const AchievementObservationGeneraleController = {
    async getByEnfantAndCategorie(req, res) {
        try {
            const observation = await AchievementObservationGeneraleService
                .getByEnfantAndCategorie(req.params.enfantId, req.params.categorie);
            res.status(200).json(observation ?? null);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération de l'observation générale", error: error.message });
        }
    },

    async save(req, res) {
        try {
            const { enfantId, categorie, observation } = req.body;
            const existing = await AchievementObservationGeneraleService
                .getByEnfantAndCategorie(enfantId, categorie);

            const saved = existing
                ? await AchievementObservationGeneraleService.update(existing.id, {
                    observation,
                    dateObservation: new Date().toISOString(),
                })
                : await AchievementObservationGeneraleService.create({
                    enfantId,
                    categorie,
                    observation,
                    dateObservation: new Date().toISOString(),
                });

            res.status(existing ? 200 : 201).json(saved);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de l'enregistrement de l'observation générale", error: error.message });
        }
    },
};

export default AchievementObservationGeneraleController;
