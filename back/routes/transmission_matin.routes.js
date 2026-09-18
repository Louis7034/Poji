import express from "express";
import TransmissionMatinController from "../controllers/transmission_matin.controller.js";

const router = express.Router();

router.get("/transmission-matin", TransmissionMatinController.getAll);
router.get("/transmission-matin/:id", TransmissionMatinController.getById);
router.post("/transmission-matin", TransmissionMatinController.create);
router.put("/transmission-matin/:id", TransmissionMatinController.update);
router.delete("/transmission-matin/:id", TransmissionMatinController.delete);

export default router;