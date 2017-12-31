const configuracoes = {
    dev: {
        URL_CONNECT_DB: "mongodb://mongo/irango",
        PORT: 3000,
    },
    prd: {
        URL_CONNECT_DB: "mongodb://admin:tiago@ds133597.mlab.com:33597/irango",
        PORT: 80,
    }
};

export default configuracoes[process.env.NODE_ENV]
