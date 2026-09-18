import express from "express";
import DejectionController from "../controllers/dejection.controller.js";

const router = express.Router();

router.get("/enfant/dejection/:id", DejectionController.getAllDejectionFromEnfantId);

router.get("/dejection/:id", DejectionController.getDejectionById);

router.post("/dejection", DejectionController.createDejection);

router.put("/dejection/:id", DejectionController.updateDejection);

router.delete("/dejection/:id", DejectionController.deleteDejection);

export default router;