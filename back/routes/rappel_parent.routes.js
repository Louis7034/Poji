import express from "express";
import RappelParentController from "../controllers/rappel_parent.controller.js";

const router = express.Router();

router.get("/rappel-parent", RappelParentController.getAll);
router.get("/rappel-parent/:id", RappelParentController.getById);
router.post("/rappel-parent", RappelParentController.create);
router.put("/rappel-parent/:id", RappelParentController.update);
router.delete("/rappel-parent/:id", RappelParentController.delete);

export default router;