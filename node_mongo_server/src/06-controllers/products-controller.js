// import ProductModel from '../03-models/product-model';
const ProductModel = require("../03-models/product-model");
const express = require("express");
const logic = require("../05-bll/products-logic");

const ProdulogicctModel = require("../05-bll/products-logic");

// import express from "express";
// import logic from "../05-bll/products-logic";

const productsController = express.Router();

productsController.get("/", async (request, response, next) => {
    try {
        const products = await logic.getAllProduct();
        response.json(products);
    }
    catch (err) {
        next(err);
    }
});

productsController.get("/:_id", async (request, response, next) => {
    try {
        const _id = request.params._id;
        const product = await logic.getOneProduct(_id);
        response.json(product);
    }
    catch (err) {
        next(err);
    }
});

productsController.post("/products", async (request, response, next) => {
    try {
        const product = new ProductModel(request.body);
        const addedProduct = await logic.addProduct(product);
        response.status(201).json(addedProduct);
    }
    catch (err) {
        next(err);
    }
});

productsController.put("/products/:_id", async (request, response, next) => {
    try {
        const _id = request.params._id;
        request.body._id = _id;
        const product = new ProductModel(request.body);
        const updatedProduct = await logic.updateProduct(product);
        response.json(updatedProduct);
    }
    catch (err) {
        next(err);
    }
});

productsController.delete("/products/:_id", async (request, response, next) => {
    try {
        const _id = request.params._id;
        await logic.deleteProduct(_id);
        response.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
});

productsController.get("/test", async (request, response, next) => {
    try {

        // const products = await logic.getPartialProducts();

        // const products = await logic.getSomeProducts();

        // const products = await logic.getPagedProducts();

        const products = await logic.getProductsUsingRegex();

        response.json(products);
    }
    catch (err) {
        next(err);
    }
});

// productsController.get("/products-paging/:page", async (request, response, next) => {
//     try {

//         const page = +request.params.page;

//         // const products = await logic.getPartialProducts();

//         const products = await logic.getSomeProducts();

//         response.json(products);
//     }
//     catch(err) {
//         next(err);
//     }
// });

// export default productsController;
module.exports = productsController;

