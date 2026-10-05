import SiesteService from "../services/sieste.service.js";

const SiesteController = {
    async getAll(req, res) {
        try {
            res.status(200).json(await SiesteService.getAll());
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des siestes", error: error.message });
        }
    },

    async getByEnfant(req, res) {
        try {
            res.status(200).json(await SiesteService.getByEnfant(req.params.enfantId));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des siestes", error: error.message });
        }
    },

    async getById(req, res) {
        try {
            res.status(200).json(await SiesteService.getById(req.params.id));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération de la sieste", error: error.message });
        }
    },

    async create(req, res) {
        try {
            res.status(201).json(await SiesteService.create(req.body));
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Erreur lors de la création de la sieste", error: error.message });
        }
    },

    async update(req, res) {
        try {
            res.status(200).json(await SiesteService.update(req.params.id, req.body));
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: "Erreur lors de la mise à jour de la sieste", error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await SiesteService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(404).json({ message: "Erreur lors de la suppression de la sieste", error: error.message });
        }
    },
};

export default SiesteController;
