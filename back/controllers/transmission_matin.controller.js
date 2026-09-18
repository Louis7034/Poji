import TransmissionMatinService from "../services/transmission_matin.service.js";

const TransmissionMatinController = {
    async getAll(req, res) {
        try {
            res.status(200).json(await TransmissionMatinService.getAll());
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des transmissions du matin", error: error.message });
        }
    },

    async getById(req, res) {
        try {
            res.status(200).json(await TransmissionMatinService.getById(req.params.id));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération de la transmission du matin", error: error.message });
        }
    },

    async create(req, res) {
        try {
            res.status(201).json(await TransmissionMatinService.create(req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la création de la transmission du matin", error: error.message });
        }
    },

    async update(req, res) {
        try {
            res.status(200).json(await TransmissionMatinService.update(req.params.id, req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la mise à jour de la transmission du matin", error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await TransmissionMatinService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la suppression de la transmission du matin", error: error.message });
        }
    },
};

export default TransmissionMatinController;