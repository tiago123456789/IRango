import dao from "../collections/Restaurante";

export default class Restaurante {

    constructor() {
        this.dao = dao;
    }

    /**
     * @description Busca todos os restaurantes.
     * @returns {Promise.<*>}
     */
    async findAll() {
        return await this.dao.find({});
    }

    /**
     * @description Busca todos os restaurantes proximos a localização do cliente.
     */
    async findAllUpcoming(lat, lng) {
        return await this.dao.find({
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
    }

    /**
     * @description Busca o restaurante com base na id.
     * @param id
     * @returns {Promise}
     */
    findById(id) {
        return new Promise((resolve, reject) => {
            this.dao
                .findOne({ _id: id })
                .then(result => resolve(result))
                .catch(error => reject(error));
        })
    }

    /**
     * @description Remove um restaurante com base id.
     * @param id
     * @returns {Promise.<void>}
     */
    async remove(id) {
        await this.dao.remove(id);
    }

    /**
     * @description Cria um novo restaurante.
     * @param novoRestaurante
     * @returns {Promise.<void>}
     */
    async create(novoRestaurante) {
        await this.dao.create(novoRestaurante);
    }
}