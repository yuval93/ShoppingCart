const cors = require("cors");

const productsController = require("./06-controllers/products-controller.js");
const ordersController = require("./06-controllers/orders-controller.js");
const express = require("express");
const config = require("./01-utils/config.js");
const errorsHandler = require("./02-middleware/errors-handler.js");
const dal = require("./04-dal/dal.js");

dal.connectToMongoDB();

const server = express();

server.use(cors());
server.use(express.json());
server.use("/api/products", productsController);
server.use("/api/orders", ordersController);
server.use(errorsHandler);

server.listen(config.port, () => console.log("Listening... on port" + config.port));    
