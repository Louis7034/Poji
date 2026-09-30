import AchievementObservateurService from "../services/achievement_observateur.service.js";

const AchievementObservateurController = {
    async getAll(req, res) {
        try {
            res.status(200).json(await AchievementObservateurService.getAll());
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des observateurs d'achievements", error: error.message });
        }
    },

    async getById(req, res) {
        try {
            res.status(200).json(await AchievementObservateurService.getById(req.params.id));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération de l'observateur d'achievement", error: error.message });
        }
    },

    async create(req, res) {
        try {
            res.status(201).json(await AchievementObservateurService.create(req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la création de l'observateur d'achievement", error: error.message });
        }
    },

    async update(req, res) {
        try {
            res.status(200).json(await AchievementObservateurService.update(req.params.id, req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la mise à jour de l'observateur d'achievement", error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await AchievementObservateurService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la suppression de l'observateur d'achievement", error: error.message });
        }
    },
};

export default AchievementObservateurController;
