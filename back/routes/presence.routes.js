import express from "express";
import PresenceController from "../controllers/presence.controller.js";

const router = express.Router();

router.get("/presence", PresenceController.getAll);
router.get("/presence/compteur-aujourd-hui", PresenceController.getCountPresentToday);
router.get("/presence/:id", PresenceController.getById);
router.post("/presence", PresenceController.create);
router.put("/presence/:id", PresenceController.update);
router.delete("/presence/:id", PresenceController.delete);

export default router;