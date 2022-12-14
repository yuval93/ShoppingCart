const { Document, Schema, model } = require("mongoose");
const { CategoryModel } = require("./category-model.js");



// Define model schema:
const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name too short"],
        maxlength: [150, "Name too long"],
        trim: true,
        unique: true
    },
    description1: {
        type: String,
        required: [true, "Missing description1"],
        minlength: [2, "description1 too short"],
        maxlength: [2500, "description1 too long"],
        trim: true,
        unique: true
    },
    description2: {
        type: String,
        required: [true, "Missing description2"],
        minlength: [2, "description2 too short"],
        maxlength: [2500, "description2 too long"],
        trim: true,
        unique: true
    },
    description3: {
        type: String,
        required: [true, "Missing description3"],
        minlength: [2, "description3 too short"],
        maxlength: [2500, "description3 too long"],
        trim: true,
        unique: true
    },
    image1: {
        type: String,
        required: [true, "Missing image1"],
        minlength: [2, "image1 too short"],
        maxlength: [2500, "image1 too long"],
        trim: true,
        unique: true
    },
    image2: {
        type: String,
        required: [true, "Missing image2"],
        minlength: [2, "image2 too short"],
        maxlength: [2500, "image2 too long"],
        trim: true,
        unique: true
    },
    storeToShop: {
        type: String,
        required: [true, "Missing storeToShop"],
        minlength: [2, "storeToShop too short"],
        maxlength: [2500, "storeToShop too long"],
        trim: true,
        unique: true
    },
    price: {
        type: Number,
        required: [true, "Missing price"],
        min: [0, "Price can't be negative"],
        max: [1000, "Price can't exceed 1000"]
    },
    categoryId: {
        type: Schema.Types.ObjectId
    }
}, {
    versionKey: false, // Don't create __v field
    toJSON: { virtuals: true }, // Fill also the virtual fields when we're calling a "populate" function
    // toJSON: { }, // Fill also the virtual fields when we're calling a "populate" function
    id: true, // Don't duplicate _id to id field
    // timestamps: true // 01/01/1970 12:00:00
});

ProductSchema.virtual("category", {
    ref: CategoryModel, // Which model are you describing
    localField: "categoryId", // Our model relation field
    foreignField: "_id", // Other model relation field
    justOne: true // One-to-Many relation --> each product has one category and not many
});

// Define model:
const ProductModel = model("ProductModel", ProductSchema, "products"); // model name, schema class, collection name
module.exports = ProductModel;
