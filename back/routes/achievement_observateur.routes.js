import express from "express";
import AchievementObservateurController from "../controllers/achievement_observateur.controller.js";

const router = express.Router();

router.get("/achievement-observateur", AchievementObservateurController.getAll);
router.get("/achievement-observateur/:id", AchievementObservateurController.getById);
router.post("/achievement-observateur", AchievementObservateurController.create);
router.put("/achievement-observateur/:id", AchievementObservateurController.update);
router.delete("/achievement-observateur/:id", AchievementObservateurController.delete);

export default router;
