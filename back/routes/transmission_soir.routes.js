import express from "express";
import TransmissionSoirController from "../controllers/transmission_soir.controller.js";

const router = express.Router();

router.get("/transmission-soir", TransmissionSoirController.getAll);
router.get("/transmission-soir/:id", TransmissionSoirController.getById);
router.post("/transmission-soir", TransmissionSoirController.create);
router.put("/transmission-soir/:id", TransmissionSoirController.update);
router.delete("/transmission-soir/:id", TransmissionSoirController.delete);

export default router;