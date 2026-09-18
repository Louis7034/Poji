import { dejectionService } from "../services/dejection.service.js";

const dejectionController = {

    async getAllDejectionFromEnfantId(req, res) {
        try {
            const enfantId = req.params.id;
            const dejections = await dejectionService.getDejection(enfantId);
            res.status(200).json(dejections);
        } catch (error) {
            console.error(error);

            res.status(500).json({
                error: error.message,
            });
        }
    },

    async getDejectionById(req, res) {
        try {
            const dejectionId = req.params.id;
            const dejection = await dejectionService.getDejectionById(dejectionId);
            res.status(200).json(dejection);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

  async createDejection(req, res) {
    try {
      const dejectionData = req.body;
      const newDejection = await dejectionService.createDejection(dejectionData);
      res.status(201).json(newDejection);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

    async updateDejection(req, res) {
        try {
            const dejectionId = req.params.id;
            const dejectionData = req.body;
            const updatedDejection = await dejectionService.updateDejection(dejectionId, dejectionData);
            res.status(200).json(updatedDejection);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteDejection(req, res) {
        try {
            const dejectionId = req.params.id;
            const deletedDejection = await dejectionService.deleteDejection(dejectionId);
            res.status(200).json(deletedDejection);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default dejectionController;

