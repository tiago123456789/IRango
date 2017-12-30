import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import restauranteRouter from "../routes/Restaurante";
import "./Database";

const app = express();

/**
 * @description Middleware responsable in parse content to json.
 */
app.use(bodyParser.json());

/**
 * @description Defined cors in application.
 */
app.use(cors());

/**
 * @description Routes application.
 */
app.use("/restaurantes", restauranteRouter());

export default app;
