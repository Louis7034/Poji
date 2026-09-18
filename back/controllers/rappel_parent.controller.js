import RappelParentService from "../services/rappel_parent.service.js";

const RappelParentController = {
    async getAll(req, res) {
        try {
            res.status(200).json(await RappelParentService.getAll());
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des rappels parents", error: error.message });
        }
    },

    async getById(req, res) {
        try {
            res.status(200).json(await RappelParentService.getById(req.params.id));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération du rappel parent", error: error.message });
        }
    },

    async create(req, res) {
        try {
            res.status(201).json(await RappelParentService.create(req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la création du rappel parent", error: error.message });
        }
    },

    async update(req, res) {
        try {
            res.status(200).json(await RappelParentService.update(req.params.id, req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la mise à jour du rappel parent", error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await RappelParentService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la suppression du rappel parent", error: error.message });
        }
    },
};

export default RappelParentController;