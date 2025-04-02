import { DataSource } from "typeorm";
import { config } from "./config";
import { TalentAlternant } from "../entities/alternant.entity";


export const AppDataSource = new DataSource({
  type: "postgres",

  // ***********info du bdd dans le config
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,

  synchronize: true,
  logging: true,
  entities: [TalentAlternant], //on ajoute ici les entités
});
