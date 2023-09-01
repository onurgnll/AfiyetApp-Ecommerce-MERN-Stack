const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "default.jpg"
    },
    restaurantid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    category: {
        type: String
    }
    ,
    restaurantname: {
        type: String
    }

})



const Product = mongoose.model("Product" , ProductSchema);

module.exports = Product;