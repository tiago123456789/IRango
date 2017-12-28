import restauranteDao from "./../collections/Restaurante";

export default class Restaurante {

    constructor() {
        this.restauranteDao = restauranteDao;
    }

    /**
     * @description Buscar um restaurante especifico.
     * @param id
     * @returns {Promise.<*>}
     */
    async findById(id) {
        return await this.restauranteDao.findById(id);
    }

    /**
     * @description Retorna todos os restaurantes.
     * @param request
     * @param response
     * @returns {Promise.<void>}
     */
    async findAll() {
        return await this.restauranteDao.find({});
    }

    /**
     * @description Busca todos os restaurantes próximos a localização atual do cliente.
     * @param request
     * @param response
     * @returns {Promise.<void>}
     */
    async findAllUpcomming(lat, lng) {
        const restaurantes = await this.restauranteDao.find({
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


        return restaurantes.map(restaurante => (
            { lat: restaurante.loc.coordinates[1], lng: restaurante.loc.coordinates[0] }
        ));
    }

    /**
     * @description Cria um novo restaurante.
     * @param request
     * @param response
     * @returns {Promise.<void>}
     */
    async create(content) {
        const novoRestaurante = {
            name: content.name,
            loc: {
                type: "Point",
                coordinates: [ parseFloat(content.lng), parseFloat(content.lat) ]
            }
        };
        await this.restauranteDao.create(novoRestaurante);
    }

    /**
     * @description Remove restaurante com base na id.
     * @param id
     */
    async remove(id) {
        await this.restauranteDao.remove({ _id: id });
    }
}