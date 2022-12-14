// import mongoose from "mongoose";
const mongoose = require("mongoose");
const ClientError = require("../03-Models/client-error.js");

// import ClientError from "../03-Models/client-error.js";
// import { IProductModel, ProductModel } from "../03-models/product-model.js";
const ProductModel = require("../03-models/product-model");

module.exports = {

    // Get all:
    async getAllProduct() {

        // Get all products without virtual fields:
        // return ProductModel.find().exec();

        // Get all product with specific virtual fields:
        return ProductModel.find().populate("category").exec();
    },

    // Get one:
    async getOneProduct(_id) {

        if (!mongoose.Types.ObjectId.isValid(_id)) throw new ClientError(404, `_id ${_id} not valid`); // להיות יותר צדיק מאפיפיור...

        const product = await ProductModel.findById(_id).exec();
        if (!product) throw new ClientError(404, `_id ${_id} not found`);

        return product;
    },

    // Insert:
    async addProduct(product) {

        // Validation:
        const errors = product.validateSync();
        if (errors) throw new ClientError(400, errors.message);

        // Add:
        return product.save();
    },

    // Update:
    async updateProduct(product) {

        if (!mongoose.Types.ObjectId.isValid(product._id)) throw new ClientError(404, `_id ${product._id} not valid`);

        // Validation:
        const errors = product.validateSync();
        if (errors) throw new ClientError(400, errors.message);

        // Update:
        const updatedProduct = await ProductModel.findByIdAndUpdate(product._id, product, { returnOriginal: false }).exec();
        if (!updatedProduct) throw new ClientError(404, `_id ${product._id} not found`);

        // Return updated product:
        return updatedProduct;
    },

    // Delete:
    async deleteProduct(_id) {
        if (!mongoose.Types.ObjectId.isValid(_id)) throw new ClientError(404, `_id ${_id} not valid`);
        const deletedProduct = await ProductModel.findByIdAndDelete(_id).exec();
        if (!deletedProduct) throw new ClientError(404, `_id ${_id} not found`);
    },

    // ------------------------------------------------------------------------------

    // Mongo Query Language

    // SELECT ___, ___, ___ FROM...
    async getPartialProducts() {

        // SELECT _id, name, price FROM Products
        // return ProductModel.find({}, ["name", "price"]).exec();

        // SELECT name, price FROM Products
        return ProductModel.find({}, { name: true, price: true, _id: false }).exec();
    },

    // SELECT * FROM Products WHERE ....
    async getSomeProducts() {

        // SELECT * FROM Products WHERE price = 10
        // return ProductModel.find({ price: 10 }).exec();

        // SELECT * FROM Products WHERE price = 10 AND name = 'Longlife Tofu'
        // return ProductModel.find({ price: 10, name: 'Longlife Tofu' }).exec();

        // SELECT * FROM Products WHERE price = 10 OR name = 'Chai'
        // return ProductModel.find({ $or: [{ price: 10 }, { name: "Chai" }] }).exec();

        // SELECT * FROM Products WHERE price BETWEEN 10 AND 20
        // >    $gt
        // >=   $gte
        // <    $lt
        // <=   $lte
        // ==   $eq
        // !=   $ne
        // return ProductModel.find({ price: { $gte: 10, $lte: 20 }}).exec();

        // SELECT * FROM Products ORDER BY price
        // return ProductModel.find({}, null, { sort: { price: 1 } }).exec();

        // SELECT * FROM Products ORDER BY price DESC
        // return ProductModel.find({}, null, { sort: { price: -1 } }).exec();

        // SELECT * FROM Products ORDER BY price, name
        // return ProductModel.find({}, null, { sort: { price: 1, name: 1 } }).exec();

        // SELECT _id, name, price FROM Products WHERE price BETWEEN 10 AND 20 ORDER BY price, name
        return ProductModel.find({ price: { $gte: 10, $lte: 20 } }, ["name", "price"], { sort: { price: 1, name: 1 } }).exec();
    },

    // SELECT * FROM Products LIMIT 20, 7
    // (skip 20 items, get next 7 items)
    async getPagedProducts() {
        return ProductModel.find({}, null, { skip: 20, limit: 7 }).exec();
    },

    // SELECT * FROM Products WHERE ProductName LIKE '% %'
    async getProductsUsingRegex() {
        return ProductModel.find({ name: { $regex: /^.+ .+$/ } }).exec();
    }

    // INNER JOIN:
    // return ProductModel.find({ categoryId: { $ne: null }}).exec();
}


// module.exports = getAllProduct
// module.exports = getOneProduct
// module.exports = addProduct
// module.exports = updateProduct
// module.exports = deleteProduct
// module.exports = getPartialProducts
// module.exports = getSomeProducts
// module.exports = getPagedProducts
// module.exports = getProductsUsingRegex
// export default {
    // getAllProduct,
    // getOneProduct,
    // addProduct,
    // updateProduct,
    // deleteProduct,
    // getPartialProducts,
    // getSomeProducts,
    // getPagedProducts,
    // getProductsUsingRegex
// };
