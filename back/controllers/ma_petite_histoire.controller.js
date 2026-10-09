import MaPetiteHistoireService from "../services/ma_petite_histoire.service.js";

const MaPetiteHistoireController = {
    async getAll(req, res) {
        try {
            res.status(200).json(await MaPetiteHistoireService.getAll());
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des fiches de l'enfant", error: error.message });
        }
    },

    async getById(req, res) {
        try {
            res.status(200).json(await MaPetiteHistoireService.getById(req.params.id));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération de la fiche de l'enfant", error: error.message });
        }
    },

    async create(req, res) {
        try {
            res.status(201).json(await MaPetiteHistoireService.create(req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la création de la fiche de l'enfant", error: error.message });
        }
    },

    async update(req, res) {
        try {
            res.status(200).json(await MaPetiteHistoireService.update(req.params.id, req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la mise à jour de la fiche de l'enfant", error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await MaPetiteHistoireService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la suppression de la fiche de l'enfant", error: error.message });
        }
    },
};

export default MaPetiteHistoireController;