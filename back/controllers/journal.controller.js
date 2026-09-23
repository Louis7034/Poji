import JournalService from "../services/journal.service.js";

const JournalController = {
    async getAll(req, res) {
        try {
            res.status(200).json(await JournalService.getAll());
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des journaux", error: error.message });
        }
    },

    async getById(req, res) {
        try {
            res.status(200).json(await JournalService.getById(req.params.id));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération du journal", error: error.message });
        }
    },

    async getByEnfant(req, res) {
        try {
            res.status(200).json(await JournalService.getByEnfant(req.params.enfantId));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération du journal de l'enfant", error: error.message });
        }
    },

    async create(req, res) {
        try {
            res.status(201).json(await JournalService.create(req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la création du journal", error: error.message });
        }
    },

    async update(req, res) {
        try {
            res.status(200).json(await JournalService.update(req.params.id, req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la mise à jour du journal", error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await JournalService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la suppression du journal", error: error.message });
        }
    },
};

export default JournalController;