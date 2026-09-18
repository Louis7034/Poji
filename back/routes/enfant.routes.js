import express from "express";
import EnfantController from "../controllers/enfant.controller.js";

const router = express.Router();

router.get("/enfant", EnfantController.getAll);

router.get("/enfant/:id", EnfantController.getById);

router.post("/enfant", EnfantController.create);

router.put("/enfant/:id", EnfantController.update);

router.delete("/enfant/:id", EnfantController.delete);

export default router;