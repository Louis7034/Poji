import express from "express";
import AchievementObservationController from "../controllers/achievement_observation.controller.js";

const router = express.Router();

router.get("/achievement-observation", AchievementObservationController.getAll);
router.get("/achievement-observation/enfant/:enfantId", AchievementObservationController.getByEnfant);
router.get("/achievement-observation/:id", AchievementObservationController.getById);
router.post("/achievement-observation", AchievementObservationController.create);
router.put("/achievement-observation/:id", AchievementObservationController.update);
router.delete("/achievement-observation/:id", AchievementObservationController.delete);

export default router;
