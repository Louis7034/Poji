import express from "express";
import AchievementObservationQuestionController from "../controllers/achievement_observation_question.controller.js";

const router = express.Router();

router.get("/achievement-observation-question", AchievementObservationQuestionController.getAll);
router.get("/achievement-observation-question/:id", AchievementObservationQuestionController.getById);
router.post("/achievement-observation-question", AchievementObservationQuestionController.create);
router.put("/achievement-observation-question/:id", AchievementObservationQuestionController.update);
router.delete("/achievement-observation-question/:id", AchievementObservationQuestionController.delete);

export default router;