import AchievementObservationService from "../services/achievement_observation.service.js";

const AchievementObservationController = {
    async getAll(req, res) {
        try {
            res.status(200).json(await AchievementObservationService.getAll());
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des observations d'achievements", error: error.message });
        }
    },

    async getByEnfant(req, res) {
        try {
            res.status(200).json(await AchievementObservationService.getByEnfant(req.params.enfantId));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des observations de l'enfant", error: error.message });
        }
    },

    async getById(req, res) {
        try {
            res.status(200).json(await AchievementObservationService.getById(req.params.id));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération de l'observation d'achievement", error: error.message });
        }
    },

    async create(req, res) {
        try {
            res.status(201).json(await AchievementObservationService.create(req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la création de l'observation d'achievement", error: error.message });
        }
    },

    async update(req, res) {
        try {
            res.status(200).json(await AchievementObservationService.update(req.params.id, req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la mise à jour de l'observation d'achievement", error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await AchievementObservationService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la suppression de l'observation d'achievement", error: error.message });
        }
    },
};

export default AchievementObservationController;
