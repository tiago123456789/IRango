import express from "express";
import bodyParser from "body-parser";
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
        name: request.body.name
    };
    await restauranteDAO.create(newRestaurante);
    response.redirect("/restaurantes");
});

app.get("/restaurantes/:id/deletar", async (request, response) => {
   const id = request.params.id;
   await restauranteDAO.remove({ _id: id });
   response.redirect("/restaurantes");
});



app.listen(port, () => console.log("Server ready."))