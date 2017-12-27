import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "./config/database";
import restauranteDAO from "./collections/Restaurante";

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

/**
 * @description Middleware responsable in parse content to json.
 */
app.use(bodyParser.urlencoded({ extended: true}));

/**
 * @description Defined cors in application.
 */
app.use(cors());

/**
 * @description Routes application.
 */
app.get("/", (request, response) => response.send("Request GET / success."));
app.get("/restaurantes", async (request, response) => {
    const restaurantes = await restauranteDAO.find({});
    response.render("index", { restaurantes });
});
app.get("/restaurantes/novo", (request, response) => response.render("novo"));
app.post("/restaurantes/novo", async (request, response) => {
    const newRestaurante = {
        name: request.body.name,
        loc: {
            type: "Point",
            coordinates: [
                parseFloat(request.body.lng), parseFloat(request.body.lat)
            ]
        }
    };
    await restauranteDAO.create(newRestaurante);
    response.redirect("/restaurantes");
});

app.get("/restaurantes/distancia", async (request, response) => {
    const { lat, lng } = request.query;

    if (lat && lng) {
        const restaurantes = await restauranteDAO.find({
            loc: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat]
                    },
                    $maxDistance: 6378.1
                }
            } 
        });
        const latitudeLongitudeRestaurantes = restaurantes.map(restaurante => ({
            lat: restaurante.loc.coordinates[1],
            lng: restaurante.loc.coordinates[0]
        }));
        response.json(latitudeLongitudeRestaurantes);
        // response.render("distance_between_map", { restaurantes, lat: lat, lng: lng });
    } else {
        response.render("distance_map");
    }
});

app.get("/restaurantes/:id/deletar", async (request, response) => {
   const id = request.params.id;
   await restauranteDAO.remove({ _id: id });
   response.redirect("/restaurantes");
});



app.listen(port, () => console.log("Server ready."))