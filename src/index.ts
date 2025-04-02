import * as dontev from "dotenv";
dontev.config();

import path from "path";
import "reflect-metadata";
import { AppDataSource } from "./config/database";
import app from "./App";

AppDataSource.initialize()

  .then(() => {
    //on met dans env, production ou development
    const env: string = process.env.NODE_ENV || "development";

    //trouve le chemin, ca donne envPath= .env.development ou .env.prod
    const envPath: string = path.resolve(process.cwd(), `.env.${env}`);

    //utiliser le envPath
    dontev.config({ path: envPath });

    //recuperation du port ,
    const port: number = Number(process.env.PORT);

    //lancement
    app.listen(port, () => {
      console.log("lancement du microservice pour ALTERNANT", port);
    });

    console.log("connexion reussite bravo");
  })

  .catch((error) => {
    console.log(error);
    throw new Error("err a la connexion du bdd");
  });
