import { AppDataSource } from "../../config/database";
import { TalentAlternant } from "../../entities/alternant.entity";

interface IData {
  keycloakId: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  adresse: string;
}

export class AlternantService {
  // ****************Repository
  private alternantRepository = AppDataSource.getRepository(TalentAlternant);

  // Création d'un alternant
  public async createAlternant(newAlternant: IData) {
    // Vérifier si l'alternant existe déjà en base
    const existingAlternant = await this.alternantRepository.findOne({
      where: { keycloakId: newAlternant.keycloakId },
    });

    if (!existingAlternant) {
      // // Créer un nouvel alternant
      const alternantNew = this.alternantRepository.create(newAlternant);

      // Sauvegarde dans la base de données
      return await this.alternantRepository.save(alternantNew);
    } else {
      throw new Error("L'utilisateur existe déjà.");
    }
  }

  // Récupération de tous les alternants
  public async getAllAlternant() {
    return await this.alternantRepository.find();
  }

  // Récupération d'un alternant par son ID
  public async getOneAlternantById(keycloakId: string) {
    return await this.alternantRepository.findOne({
      where: { keycloakId: keycloakId },
    });
  }
}
