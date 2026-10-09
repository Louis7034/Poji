import express from "express";
import MaPetiteHistoireController from "../controllers/ma_petite_histoire.controller.js";

const router = express.Router();

router.get("/ma-petite-histoire", MaPetiteHistoireController.getAll);
router.get("/ma-petite-histoire/:id", MaPetiteHistoireController.getById);
router.post("/ma-petite-histoire", MaPetiteHistoireController.create);
router.put("/ma-petite-histoire/:id", MaPetiteHistoireController.update);
router.delete("/ma-petite-histoire/:id", MaPetiteHistoireController.delete);

export default router;