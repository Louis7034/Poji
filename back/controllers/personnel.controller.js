import PersonnelService from "../services/personnel.service.js";

const PersonnelController = {
    async getAll(req, res) {
        try {
            res.status(200).json(await PersonnelService.getAll());
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération du personnel", error: error.message });
        }
    },

    async getById(req, res) {
        try {
            res.status(200).json(await PersonnelService.getById(req.params.id));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération du membre du personnel", error: error.message });
        }
    },

    async create(req, res) {
        try {
            res.status(201).json(await PersonnelService.create(req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la création du membre du personnel", error: error.message });
        }
    },

    async update(req, res) {
        try {
            res.status(200).json(await PersonnelService.update(req.params.id, req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la mise à jour du membre du personnel", error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await PersonnelService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la suppression du membre du personnel", error: error.message });
        }
    },
};

export default PersonnelController;