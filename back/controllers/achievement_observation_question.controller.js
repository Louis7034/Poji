import AchievementObservationQuestionService from "../services/achievement_observation_question.service.js";

const AchievementObservationQuestionController = {
    async getAll(req, res) {
        try {
            res.status(200).json(await AchievementObservationQuestionService.getAll());
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des questions d'observation", error: error.message });
        }
    },

    async getById(req, res) {
        try {
            res.status(200).json(await AchievementObservationQuestionService.getById(req.params.id));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération de la question d'observation", error: error.message });
        }
    },

    async create(req, res) {
        try {
            res.status(201).json(await AchievementObservationQuestionService.create(req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la création de la question d'observation", error: error.message });
        }
    },

    async update(req, res) {
        try {
            res.status(200).json(await AchievementObservationQuestionService.update(req.params.id, req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la mise à jour de la question d'observation", error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await AchievementObservationQuestionService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la suppression de la question d'observation", error: error.message });
        }
    },
};

export default AchievementObservationQuestionController;