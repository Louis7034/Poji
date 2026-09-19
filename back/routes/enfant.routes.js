import express from "express";
import EnfantController from "../controllers/enfant.controller.js";

const router = express.Router();

router.get("/enfants", EnfantController.getAll);

router.get("/enfants/:id", EnfantController.getById);

router.post("/enfants", EnfantController.create);

router.put("/enfants/:id", EnfantController.update);

router.delete("/enfants/:id", EnfantController.delete);

export default router;