import express from "express";
import AchievementController from "../controllers/achievement.controller.js";

const router = express.Router();

router.get("/achievement", AchievementController.getAll);
router.get("/achievement/:id", AchievementController.getById);
router.post("/achievement", AchievementController.create);
router.put("/achievement/:id", AchievementController.update);
router.delete("/achievement/:id", AchievementController.delete);

export default router;
