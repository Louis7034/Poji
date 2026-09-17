import EnfantService from "../services/enfant.service.js";

const EnfantController = {
    async getAll(req, res) {
        try {
            const enfants = await EnfantService.getAll();

            res.status(200).json(enfants);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Erreur lors de la récupération des enfants",
                error: error.message,
            });
        }
    },

    async getById(req, res) {
        try {
            const enfant = await EnfantService.getById(req.params.id);
            res.status(200).json(enfant);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Erreur lors de la récupération de l'enfant",
                error: error.message,
            });
        }
    },

    async create(req, res) {
        try {
            const newEnfant = await EnfantService.create(req.body);
            res.status(201).json(newEnfant);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message: "Erreur lors de la création de l'enfant",
                error: error.message,
            });
        }
    },

    async update(req, res) {
        try {
            const updatedEnfant = await EnfantService.update(req.params.id, req.body);
            res.status(200).json(updatedEnfant);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erreur lors de la mise à jour de l'enfant",
                error: error.message,
            });
        }
    },

    async delete(req, res) {
        try {
            await EnfantService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erreur lors de la suppression de l'enfant",
                error: error.message,
            });
        }
    },
};

export default EnfantController;