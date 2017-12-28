export default class Response {

    /**
     * @description Obtêm todos os erros de validação.
     * @param errors
     * @returns {Array}
     */
    static getErrorsValidation(errors) {
        return Object.keys(errors).map(chave => errors[chave].message );
    }
}