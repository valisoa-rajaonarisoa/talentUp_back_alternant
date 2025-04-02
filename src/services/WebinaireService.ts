import { AppDataSource } from "../config/database";
import { TalentAlternant } from "../entities/alternant.entity";
import { TalentupWebinaire } from "../entities/webinaire.entity";
interface ICreateWebinaire {
  keycloakId: string;
  titre: string;
  categorie: string;
  type: string;
  niveau: string;
  image: string;
  source: string;
  auteur: string;
}

type webinaireInfoType = {
  webinaire: {};
  auteur: {};
};
export class WebinareService {
  //recuperation des repository
  private webinaireRepository = AppDataSource.getRepository(TalentupWebinaire);
  private alternantRepository = AppDataSource.getRepository(TalentAlternant);

  //creer un webinaire
  public async createWebinaire(newWebinaire: ICreateWebinaire) {
    const webinaire = {
      titre: newWebinaire.titre,
      categorie: newWebinaire.categorie,
      type: newWebinaire.type,
      niveau: newWebinaire.niveau,
      image: newWebinaire.image,
      source: newWebinaire.source,
      auteur: newWebinaire.auteur,
    };

    //verification de l'auteur
    const alternant = await this.alternantRepository.findOne({
      where: { keycloakId: newWebinaire.keycloakId },
    });

    //n'existe pas
    if (!alternant) {
      throw new Error(`Le compte alternant n' existe pas`);
    }

    //enregsitement
    const talentWebinaire: TalentupWebinaire =
      this.webinaireRepository.create(webinaire);

    const create = await this.webinaireRepository.save(talentWebinaire);
    return create;
  }

  //voir les webianires
  public async getAllWebiniare() {
    // return await this.webinaireRepository.find();
    const webinaires = await this.webinaireRepository.find();

    //voir l'auteur pour chaque webinaires
    // webianires;
    const webinairesAlternants: webinaireInfoType[] = [];

    for (const web of webinaires) {
      // rechercher l'auteur
      const auteur = await this.alternantRepository.findOne({
        where: { keycloakId: web.auteur },
      });

      // ajout du webinaires dans un tableaux
      webinairesAlternants.push({
        webinaire: web,
        auteur: auteur as TalentAlternant,
      });
    }

    return webinairesAlternants;
  }

  //voir tout les webinaires d'un alternant
  public async getAllWebiniareByAlternant(keycloakId: string) {
    //verification de l'user dans alternant
    const alternant = await this.alternantRepository.findOne({
      where: { keycloakId: keycloakId },
    });

    //n'existe pas
    if (!alternant) {
      throw new Error(`Le compte alternant n' existe pas`);
    }

    //il existe , on va le retourne avec les info de l'alternant

    const webianires = await this.webinaireRepository.find({
      where: { auteur: keycloakId },
    });

    // webianires;
    const webianiresAlternants: webinaireInfoType[] = [];

    let webInfo = {
      webinaire: {},
      auteur: {},
    };

    webianires.map((web) => {
      webInfo.webinaire = web;
      webInfo.auteur = alternant;
      webianiresAlternants.push(webInfo);
    });
    return webianiresAlternants;
  }

  //voir un seul webinaires
  public async getOneWebiniare(webinaireid: string) {
    //verification de l'user dans alternant
    const webinaireInfo = await this.webinaireRepository.findOne({
      where: { webinaireid: webinaireid },
    });

    //n'existe pas
    if (!webinaireInfo) {
      throw new Error(`Le webinaire n' existe pas`);
    }

    //il existe

    //chercher l'auteur
    const auteur = await this.alternantRepository.findOne({
      where: { keycloakId: webinaireInfo.auteur },
    });

    const webinaire = {
      webinaireInfo,
      auteur,
    };

    return webinaire;
  }
}
