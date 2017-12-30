import RestauranteService from "../services/Restaurante";
import Response from "../modules/Response";

export default class Restaurante {

    constructor() {
       this.restauranteService = new RestauranteService();
    }

    /**
     * @description Retorna todos os restaurantes.
     * @param request
     * @param response
     * @returns {Promise.<void>}
     */
    async findAll(request, response) {
        const restaurantes = await this.restauranteService.findAll();
        response.status(Response.OK()).json(restaurantes);
    }

    /**
     * @description Busca todos os restaurantes próximos a localização atual do cliente.
     * @param request
     * @param response
     * @returns {Promise.<void>}
     */
    async findAllUpcomming(request, response) {
        const { lat, lng } = request.query;
        const restaurantes = await this.restauranteService.findAllUpcomming(lat, lng);
        response.status(Response.OK()).json(restaurantes);
    }

    /**
     * @description Cria um novo restaurante.
     * @param request
     * @param response
     * @returns {Promise.<void>}
     */
    async create(request, response) {
        try {
            await this.restauranteService.create(request.body);
            response.sendStatus(Response.CREATED());
        } catch(e) {
            response.status(Response.BAD_REQUEST())
                    .json({ messageErro: Response.getErrorsValidation(e.errors)});
        }
    }

    /**
     * @description Remove restaurantes com base na id.
     * @param request
     * @param response
     * @returns {Promise.<void>}
     */
    remove(request, response) {
        try {
            const id = request.params.id;
            this.restauranteService.findById(id)
                .then(async (resultado) => {
                    await this.restauranteService.remove(id);
                    response.sendStatus(Response.NO_CONTENT());
                })
                .catch(error => {
                    console.log(error);
                    response.sendStatus(Response.NOT_FOUND())
                });
        } catch (e) {
            response.status(Response.INTERNAL_SERVER_ERROR())
                    .json({ messageErro: Response.getErrorsValidation(e.errors)});
        }
    }
}