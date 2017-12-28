import RestauranteService from "./../services/Restaurante";
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
        response.status(200).json(restaurantes);
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
        response.status(200).json(restaurantes);
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
            response.sendStatus(201);
        } catch(e) {
            response.status(400).json({ messageErro: Response.getErrorsValidation(e.errors)});
        }
    }

    /**
     * @description Remove restaurantes com base na id.
     * @param request
     * @param response
     * @returns {Promise.<void>}
     */
    async remove(request, response) {
        try {
            const id = request.params.id;
            // const isExisteRestaurante = await this.restauranteService.findById(id);
            // if (isExisteRestaurante) {
            //     response.sendStatus(404);
            // } else {
                await this.restauranteService.remove(id);
                response.sendStatus(204);
            // }
        } catch (e) {
            response.status(400).json({ messageErro: Response.getErrorsValidation(e.errors)});
        }
    }

}