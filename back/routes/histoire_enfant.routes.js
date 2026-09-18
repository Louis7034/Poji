import express from "express";
import HistoireEnfantController from "../controllers/histoire_enfant.controller.js";

const router = express.Router();

router.get("/histoire-enfant", HistoireEnfantController.getAll);
router.get("/histoire-enfant/:id", HistoireEnfantController.getById);
router.post("/histoire-enfant", HistoireEnfantController.create);
router.put("/histoire-enfant/:id", HistoireEnfantController.update);
router.delete("/histoire-enfant/:id", HistoireEnfantController.delete);

export default router;