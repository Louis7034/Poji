import express from "express";
import ProblemeSanteController from "../controllers/probleme_sante.controller.js";

const router = express.Router();

router.get("/probleme-sante", ProblemeSanteController.getAll);
router.get("/probleme-sante/:id", ProblemeSanteController.getById);
router.post("/probleme-sante", ProblemeSanteController.create);
router.put("/probleme-sante/:id", ProblemeSanteController.update);
router.delete("/probleme-sante/:id", ProblemeSanteController.delete);

export default router;