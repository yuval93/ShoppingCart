const ClientError = require("../03-Models/client-error");

function errorsHandler(err, request, response, next) {

    console.log(err);

    // Save to log file...

    // Crash, like throw...: 
    if (err instanceof Error) {
        response.status((err).status || 500).send(err.message);
        return;
    }

    // Client error: 
    if (err instanceof ClientError) {
        response.status(err.status).send(err.message);
        return;
    }

    next(); // Just in case...
}


module.exports = errorsHandler;
