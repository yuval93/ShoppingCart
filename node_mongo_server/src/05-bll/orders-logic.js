// import mongoose from "mongoose";
const mongoose = require("mongoose");
const ClientError = require("../03-Models/client-error.js");

// import ClientError from "../03-Models/client-error.js";
// import { IOrderModel, OrderModel } from "../03-models/order-model.js";
const OrderModel = require("../03-models/order-model");

module.exports = {

    // Get all:
    async getAllOrder() {

        // Get all orders without virtual fields:
        // return OrderModel.find().exec();

        // Get all order with specific virtual fields:
        return OrderModel.find().exec();
    },

    // Get one:
    async getOneOrder(_id) {

        if (!mongoose.Types.ObjectId.isValid(_id)) throw new ClientError(404, `_id ${_id} not valid`); // להיות יותר צדיק מאפיפיור...

        const order = await OrderModel.findById(_id).exec();
        if (!order) throw new ClientError(404, `_id ${_id} not found`);

        return order;
    },

    // Insert:
    async addOrder(order) {

        // Validation:
        const errors = order.validateSync();
        if (errors) throw new ClientError(400, errors.message);

        // Add:
        return order.save();
    },

    // Update:
    async updateOrder(order) {

        if (!mongoose.Types.ObjectId.isValid(order._id)) throw new ClientError(404, `_id ${order._id} not valid`);

        // Validation:
        const errors = order.validateSync();
        if (errors) throw new ClientError(400, errors.message);

        // Update:
        const updatedOrder = await OrderModel.findByIdAndUpdate(order._id, order, { returnOriginal: false }).exec();
        if (!updatedOrder) throw new ClientError(404, `_id ${order._id} not found`);

        // Return updated order:
        return updatedOrder;
    },

    // Delete:
    async deleteOrder(_id) {
        if (!mongoose.Types.ObjectId.isValid(_id)) throw new ClientError(404, `_id ${_id} not valid`);
        const deletedOrder = await OrderModel.findByIdAndDelete(_id).exec();
        if (!deletedOrder) throw new ClientError(404, `_id ${_id} not found`);
    },

    // ------------------------------------------------------------------------------

    // Mongo Query Language

    // SELECT ___, ___, ___ FROM...
    async getPartialOrders() {

        // SELECT _id, name, price FROM Orders
        // return OrderModel.find({}, ["name", "price"]).exec();

        // SELECT name, price FROM Orders
        return OrderModel.find({}, { name: true, price: true, _id: false }).exec();
    },

    // SELECT * FROM Orders WHERE ....
    async getSomeOrders() {

        // SELECT * FROM Orders WHERE price = 10
        // return OrderModel.find({ price: 10 }).exec();

        // SELECT * FROM Orders WHERE price = 10 AND name = 'Longlife Tofu'
        // return OrderModel.find({ price: 10, name: 'Longlife Tofu' }).exec();

        // SELECT * FROM Orders WHERE price = 10 OR name = 'Chai'
        // return OrderModel.find({ $or: [{ price: 10 }, { name: "Chai" }] }).exec();

        // SELECT * FROM Orders WHERE price BETWEEN 10 AND 20
        // >    $gt
        // >=   $gte
        // <    $lt
        // <=   $lte
        // ==   $eq
        // !=   $ne
        // return OrderModel.find({ price: { $gte: 10, $lte: 20 }}).exec();

        // SELECT * FROM Orders ORDER BY price
        // return OrderModel.find({}, null, { sort: { price: 1 } }).exec();

        // SELECT * FROM Orders ORDER BY price DESC
        // return OrderModel.find({}, null, { sort: { price: -1 } }).exec();

        // SELECT * FROM Orders ORDER BY price, name
        // return OrderModel.find({}, null, { sort: { price: 1, name: 1 } }).exec();

        // SELECT _id, name, price FROM Orders WHERE price BETWEEN 10 AND 20 ORDER BY price, name
        return OrderModel.find({ price: { $gte: 10, $lte: 20 } }, ["name", "price"], { sort: { price: 1, name: 1 } }).exec();
    },

    // SELECT * FROM Orders LIMIT 20, 7
    // (skip 20 items, get next 7 items)
    async getPagedOrders() {
        return OrderModel.find({}, null, { skip: 20, limit: 7 }).exec();
    },

    // SELECT * FROM Orders WHERE OrderName LIKE '% %'
    async getOrdersUsingRegex() {
        return OrderModel.find({ name: { $regex: /^.+ .+$/ } }).exec();
    }

    // INNER JOIN:
    // return OrderModel.find({ categoryId: { $ne: null }}).exec();
}


// module.exports = getAllOrder
// module.exports = getOneOrder
// module.exports = addOrder
// module.exports = updateOrder
// module.exports = deleteOrder
// module.exports = getPartialOrders
// module.exports = getSomeOrders
// module.exports = getPagedOrders
// module.exports = getOrdersUsingRegex
// export default {
    // getAllOrder,
    // getOneOrder,
    // addOrder,
    // updateOrder,
    // deleteOrder,
    // getPartialOrders,
    // getSomeOrders,
    // getPagedOrders,
    // getOrdersUsingRegex
// };
