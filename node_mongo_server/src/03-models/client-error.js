class ClientError {

    status; // 4xx  400, 401, 403, 404...
    message;

    constructor(status, message) {
        this.status = status;
        this.message = message;
    }

}

module.exports = ClientError;
