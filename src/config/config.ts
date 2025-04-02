import * as dotenv from "dotenv";
import * as path from "path";

//on cree un enFile, il va voir si c'est en mode prod alors en.production ou pas
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

//utilisation de l'env selon le mode 
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const config = {
  db: {
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DBNAME,
  },
};
