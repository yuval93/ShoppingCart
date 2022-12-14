// import { Document, Schema, model } from "mongoose";
const { Document, Schema, model } = require("mongoose");


// Schema:
const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "Name too short"],
        maxlength: [50, "Name too long"],
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, "Missing description"],
        minlength: [2, "Description too short"],
        maxlength: [500, "Description too long"],
        trim: true
    }
});

// Model:
const CategoryModel = model("CategoryModel", CategorySchema, "categories");
module.exports = CategoryModel;
