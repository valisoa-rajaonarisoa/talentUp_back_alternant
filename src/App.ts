import { Application } from "express";
import express from "express";
// import alternant from "./routesalternant";

import alternantRoute from "./routes/AlternantRoute";
import cors from "cors";

class App {
  public app: Application;

  constructor() {
    this.app = express(); // Initialisation express
    this.apiCors();
    this.initialisationMiddlewares();
    this.initialisationRoutes();
  }

  private apiCors(): void {
    this.app.use(
      cors({
        origin: "http://192.168.88.9:5004",
        methods: "GET,POST,PUT,DELETE",
        allowedHeaders: "Content-Type,Authorization",
        credentials: true,
      })
    );
  }

  private initialisationMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initialisationRoutes(): void {
    this.app.use("/", alternantRoute);
  }
}

export default new App().app;
