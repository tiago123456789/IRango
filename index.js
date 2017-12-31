import app from "./src/config/Server";

app.listen(app.configuracoes.PORT, () => console.log("Server ready."));