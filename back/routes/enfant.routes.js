import express from "express";
import EnfantController from "../controllers/enfant.controller.js";

const router = express.Router();

router.get("/", EnfantController.getAll);

router.get("/:id", EnfantController.getById);

router.post("/", EnfantController.create);

router.put("/:id", EnfantController.update);

router.delete("/:id", EnfantController.delete);

export default router;