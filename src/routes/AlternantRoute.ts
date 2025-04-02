import { Router } from "express";
import { AlternantController } from "../alternant/controllers/AlternantController";

const router = Router();

const alternantController = new AlternantController();

router.get("/allAlternant", alternantController.getAllAlternant);

router.get("/alternant/:keycloakId", alternantController.getOneAlternantById);

router.post("/createAlternant", alternantController.createAlternant);

export default router;
