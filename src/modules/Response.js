export default class Response {

    static OK() { return 200 };
    static CREATED() { return 201 };
    static NOT_FOUND() { return 404 };
    static BAD_REQUEST() { return 400 };
    static NO_CONTENT() { return 204 };
    static INTERNAL_SERVER_ERROR() { return 500 };

    /**
     * @description Obtêm todos os erros de validação.
     * @param errors
     * @returns {Array}
     */
    static getErrorsValidation(errors) {
        return Object.keys(errors).map(chave => errors[chave].message );
    }
}