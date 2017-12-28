import express from "express";
import RestauranteController from "./../controllers/Restaurante";

export default () => {
    const router = express.Router();
    const restauranteController = new RestauranteController();

    router.get("/", (request, response) => restauranteController.findAll(request, response));
    router.post("/", (request, response) => restauranteController.create(request, response));
    router.get("/distancia", (request, response) => restauranteController.findAllUpcomming(request, response));
    router.delete("/:id", (request, response) => restauranteController.remove(request, response));
    return router;
}