import { Request, Response } from "express";
import { WebinareService } from "../services/WebinaireService";

export class WebinaireController {
  //   ****************create
  public async createWebinaire(req: Request, res: Response) {
    try {
      const webinaire = req.body;

      const webinaireService = new WebinareService();

      const result = await webinaireService.createWebinaire(
        webinaire.dataWebinaire
      );

      res.status(201).json(result);
      return;
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erreur lors de la création de l'apprenant" });
      console.log("error", error);

      return;
    }
  }

  //all webinaires
  public async getAllWebinaire(req: Request, res: Response) {
    try {
      const webinaireService = new WebinareService();

      const webianires = await webinaireService.getAllWebiniare();

      res.status(200).json(webianires);
    } catch (error) {
      res.status(500).json({
        message: `Erreur lors de la récupération des webinaires micro-services alternant : ${error}`,
      });
    }
  }

  //webinaire par apprenant
  public async getAllWebinaireByAlternant(req: Request, res: Response) {
    try {
      const { keycloakId } = req.params;
      const webinaireService = new WebinareService();

      const webianires = await webinaireService.getAllWebiniareByAlternant(
        keycloakId
      );

      res.status(200).json(webianires);
    } catch (error) {
      res.status(500).json({
        message: `Erreur lors de la récupération des webinaires micro-services alternant : ${error}`,
      });
    }
  }

  //webinaire par apprenant
  public async getOneWebinaire(req: Request, res: Response) {
    try {
      const { webinaireid } = req.params;
      const webinaireService = new WebinareService();

      const webianire = await webinaireService.getOneWebiniare(webinaireid);

      res.status(200).json(webianire);
    } catch (error) {
      res.status(500).json({
        message: `Erreur lors de la récupération des webinaires micro-services alternant : ${error}`,
      });
    }
  }
}
