import PresenceService from "../services/presence.service.js";

const PresenceController = {
    async getAll(req, res) {
        try {
            res.status(200).json(await PresenceService.getAll());
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des présences", error: error.message });
        }
    },

    async getById(req, res) {
        try {
            res.status(200).json(await PresenceService.getById(req.params.id));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération de la présence", error: error.message });
        }
    },

    async create(req, res) {
        try {
            res.status(201).json(await PresenceService.create(req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la création de la présence", error: error.message });
        }
    },

    async update(req, res) {
        try {
            res.status(200).json(await PresenceService.update(req.params.id, req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la mise à jour de la présence", error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await PresenceService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la suppression de la présence", error: error.message });
        }
    },
};

export default PresenceController;