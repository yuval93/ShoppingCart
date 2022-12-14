const { Document, Schema, model } = require("mongoose");
const { ProductModel } = require("./product-model.js");



// Define model schema:
const OrderSchema = new Schema({
    cart: {
        type: [{}],
        required: [true, "Missing cart"],
        minlength: [2, "cart too short"],
        maxlength: [150, "cart too long"],
        trim: true,
        unique: false
    },
    name: {
        type: String,
        required: [true, "Missing name"],
        minlength: [2, "name too short"],
        maxlength: [2500, "name too long"],
        trim: true,
        unique: false
    },
    phone: {
        type: String,
        required: [true, "Missing phone"],
        minlength: [2, "phone too short"],
        maxlength: [2500, "phone too long"],
        trim: true,
        unique: false
    },
    address: {
        type: {
            city: String,
            street: String,
            flat_number: Number,
            floor: Number,

        },
        required: [true, "Missing address"],


    },
}, {
    versionKey: false, // Don't create __v field
    // toJSON: { virtuals: true }, // Fill also the virtual fields when we're calling a "populate" function
    toJSON: {}, // Fill also the virtual fields when we're calling a "populate" function
    id: true, // Don't duplicate _id to id field
    // timestamps: true // 01/01/1970 12:00:00
});

// OrderSchema.virtual("order", {
//     ref: OrderModel, // Which model are you describing
//     localField: "orderId", // Our model relation field
//     foreignField: "_id", // Other model relation field
//     justOne: true // One-to-Many relation --> each order has one order and not many
// });

// Define model:
const OrderModel = model("OrderModel", OrderSchema, "orders"); // model name, schema class, collection name
module.exports = OrderModel;
