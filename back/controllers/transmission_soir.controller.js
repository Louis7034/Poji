import TransmissionSoirService from "../services/transmission_soir.service.js";

const TransmissionSoirController = {
    async getAll(req, res) {
        try {
            res.status(200).json(await TransmissionSoirService.getAll());
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des transmissions du soir", error: error.message });
        }
    },

    async getById(req, res) {
        try {
            res.status(200).json(await TransmissionSoirService.getById(req.params.id));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération de la transmission du soir", error: error.message });
        }
    },

    async create(req, res) {
        try {
            res.status(201).json(await TransmissionSoirService.create(req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la création de la transmission du soir", error: error.message });
        }
    },

    async update(req, res) {
        try {
            res.status(200).json(await TransmissionSoirService.update(req.params.id, req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la mise à jour de la transmission du soir", error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await TransmissionSoirService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la suppression de la transmission du soir", error: error.message });
        }
    },
};

export default TransmissionSoirController;