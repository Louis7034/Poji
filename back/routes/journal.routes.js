import express from "express";
import JournalController from "../controllers/journal.controller.js";

const router = express.Router();

router.get("/journal", JournalController.getAll);
router.get("/journal/enfant/:enfantId", JournalController.getByEnfant);
router.get("/journal/:id", JournalController.getById);
router.post("/journal", JournalController.create);
router.put("/journal/:id", JournalController.update);
router.delete("/journal/:id", JournalController.delete);

export default router;