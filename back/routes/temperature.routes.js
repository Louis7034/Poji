import express from "express";
import TemperatureController from "../controllers/temperature.controller.js";

const router = express.Router();

router.get("/temperature", TemperatureController.getAll);
router.get("/temperature/:id", TemperatureController.getById);
router.post("/temperature", TemperatureController.create);
router.put("/temperature/:id", TemperatureController.update);
router.delete("/temperature/:id", TemperatureController.delete);

export default router;