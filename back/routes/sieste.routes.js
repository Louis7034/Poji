import express from "express";
import SiesteController from "../controllers/sieste.controller.js";

const router = express.Router();

router.get("/sieste", SiesteController.getAll);
router.get("/sieste/enfant/:enfantId", SiesteController.getByEnfant);
router.get("/sieste/:id", SiesteController.getById);
router.post("/sieste", SiesteController.create);
router.put("/sieste/:id", SiesteController.update);
router.delete("/sieste/:id", SiesteController.delete);

export default router;
