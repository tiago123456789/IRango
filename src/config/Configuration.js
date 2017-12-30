const configuracoes = {
    dev: {
        URL_CONNECT_DB: "mongodb://mongo/irango",
        PORT: 3000,
        PARAM_AUTHENTICATION_JWT: "Authorization"
    },
    prd: {
        URL_CONNECT_DB: "",
        PORT: 80,
        PARAM_AUTHENTICATION_JWT: "Authorization"
    }
};

export default () => configuracoes[process.env.ambiente]
