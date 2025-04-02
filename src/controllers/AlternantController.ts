import { Request, Response } from "express";
import { AlternantService } from "../services/AlternantService";

export class AlternantController {
  //   ************create Alternant
  public async createAlternant(req: Request, res: Response): Promise<void> {
    console.log(req.body);
    try {
      //recupeartion des info
      const alternant = req.body;

      //services
      const alternantService = new AlternantService();

      //enregsitrement
      const createAlternant = await alternantService.createAlternant(alternant);

      res.status(201).json(createAlternant);
      return;
    } catch (error) {
      res.status(500).json({
        error:
          "erreur lors de la creation d'un Alternant micro-service alternant",
      });
    }
  }

  //   ********************get all alternant **
  public async getAllAlternant(req: Request, res: Response) {
    try {
      // Création de l'instance du service
      const alternantService = new AlternantService();

      // Récupération des alternants
      const alternants = await alternantService.getAllAlternant();

      // Retourner la réponse au client
      res.status(200).json(alternants);
      return;
    } catch (error) {
      console.error("Erreur lors de la récupération des alternants :", error);

      res.status(500).json({
        error: "Erreur lors de la récupération des alternants",
        details: error instanceof Error ? error.message : error,
      });
      return;
    }
  }
  //   ********************get one ALtenant **
  public async getOneAlternantById(req: Request, res: Response) {
    try {
      // recuperation des values

      const { keycloakId } = req.params;
      const alternantService = new AlternantService();

      const result = await alternantService.getOneAlternantById(keycloakId);

      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: "utilisateur non trouvé " });
      }
      return;
    } catch (error) {
      res
        .status(500)
        .json({ error: "erreur lors de la recuperation  d'un alternant" });
    }
    return;
  }
}
