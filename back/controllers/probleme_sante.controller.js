import ProblemeSanteService from "../services/probleme_sante.service.js";

const ProblemeSanteController = {
    async getAll(req, res) {
        try {
            res.status(200).json(await ProblemeSanteService.getAll());
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération des problèmes de santé", error: error.message });
        }
    },

    async getById(req, res) {
        try {
            res.status(200).json(await ProblemeSanteService.getById(req.params.id));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la récupération du problème de santé", error: error.message });
        }
    },

    async create(req, res) {
        try {
            res.status(201).json(await ProblemeSanteService.create(req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la création du problème de santé", error: error.message });
        }
    },

    async update(req, res) {
        try {
            res.status(200).json(await ProblemeSanteService.update(req.params.id, req.body));
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la mise à jour du problème de santé", error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await ProblemeSanteService.delete(req.params.id);
            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la suppression du problème de santé", error: error.message });
        }
    },
};

export default ProblemeSanteController;