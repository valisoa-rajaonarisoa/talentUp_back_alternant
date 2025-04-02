import { Router } from "express";
import { WebinaireController } from "../controllers/WebinaireController";

const router = Router();
const webinaireController = new WebinaireController();
router.post("/createWebinaire", webinaireController.createWebinaire);
router.get("/allWebinaire", webinaireController.getAllWebinaire);
router.get(
  "/keycloakId/webinaire",
  webinaireController.getAllWebinaireByAlternant
);
router.post("/webinaire/webinaireid", webinaireController.getOneWebinaire);

export default router;
