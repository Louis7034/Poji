import express from "express";
import PersonnelController from "../controllers/personnel.controller.js";

const router = express.Router();

router.get("/personnel", PersonnelController.getAll);
router.get("/personnel/:id", PersonnelController.getById);
router.post("/personnel", PersonnelController.create);
router.put("/personnel/:id", PersonnelController.update);
router.delete("/personnel/:id", PersonnelController.delete);

export default router;