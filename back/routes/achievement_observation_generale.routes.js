import express from "express";
import AchievementObservationGeneraleController from "../controllers/achievement_observation_generale.controller.js";

const router = express.Router();

router.get(
    "/achievement-observation-generale/enfant/:enfantId/categorie/:categorie",
    AchievementObservationGeneraleController.getByEnfantAndCategorie,
);
router.post(
    "/achievement-observation-generale",
    AchievementObservationGeneraleController.save,
);

export default router;
