// import OrderModel from '../03-models/order-model';
const OrderModel = require("../03-models/order-model");
const express = require("express");
const logic = require("../05-bll/orders-logic");

const ProdulogicctModel = require("../05-bll/orders-logic");

// import express from "express";
// import logic from "../05-bll/orders-logic";

const ordersController = express.Router();

ordersController.get("/", async (request, response, next) => {
    try {
        const orders = await logic.getAllOrder();
        response.json(orders);
    }
    catch (err) {
        next(err);
    }
});

ordersController.get("/:_id", async (request, response, next) => {
    try {
        const _id = request.params._id;
        const order = await logic.getOneOrder(_id);
        response.json(order);
    }
    catch (err) {
        next(err);
    }
});

ordersController.post("/", async (request, response, next) => {
    try {
        // console.log("request.body")
        // console.log(request.body)
        const order = new OrderModel(request.body);
        // const order = request.body;
        // console.log("order")
        // console.log(order)
        // console.log("gosing to await")
        const addedOrder = await logic.addOrder(order);
        console.log(" addedOrder")
        console.log(addedOrder)
        // response.status(201).json(addedOrder);
    }
    catch (err) {
        next(err);
    }
});

ordersController.put("/orders/:_id", async (request, response, next) => {
    try {
        const _id = request.params._id;
        request.body._id = _id;
        const order = new OrderModel(request.body);
        const updatedOrder = await logic.updateOrder(order);
        response.json(updatedOrder);
    }
    catch (err) {
        next(err);
    }
});

ordersController.delete("/orders/:_id", async (request, response, next) => {
    try {
        const _id = request.params._id;
        await logic.deleteOrder(_id);
        response.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});

ordersController.get("/test", async (request, response, next) => {
    try {

        // const orders = await logic.getPartialOrders();

        // const orders = await logic.getSomeOrders();

        // const orders = await logic.getPagedOrders();

        const orders = await logic.getOrdersUsingRegex();

        response.json(orders);
    }
    catch (err) {
        next(err);
    }
});

// ordersController.get("/orders-paging/:page", async (request, response, next) => {
//     try {

//         const page = +request.params.page;

//         // const orders = await logic.getPartialOrders();

//         const orders = await logic.getSomeOrders();

//         response.json(orders);
//     }
//     catch(err) {
//         next(err);
//     }
// });

// export default ordersController;
module.exports = ordersController;

