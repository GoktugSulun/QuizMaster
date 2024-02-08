class Helpers {
    static responseMessage(res, type, message, data) {
        const response = { type, message, data };
        res.json(response);
    }
    static responseJSON(res, result) {
        if (result.type) {
            Helpers.responseMessage(res, true, result.message, result.data);
        }
        else {
            Helpers.responseMessage(res, false, result.message);
        }
    }
    static responseError(error, message) {
        return {
            type: false,
            message: (error instanceof Error) ? error.message : (message || 'Unknown Error')
        };
    }
}
export default Helpers;
