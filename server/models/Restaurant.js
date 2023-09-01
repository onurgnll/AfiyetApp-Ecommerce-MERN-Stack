const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const RestaurantSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: "Belirtilmedi"
    },
    ranking: {
        type: Number,
        default: 0
    },
    userRanked: {
        type: Number,
        default: 0
    },
    averageRank: {
        type: Number,
        default: 0
    },
    address: {
        type: String,
        required: true
    },
    openTime: {
        type: String,
        default: "08:00"
    },
    closeTime: {
        type: String,
        default: "23:00"
    },
    comments: {
        type: [String]
    },
    contact: {
        phoneNumber: {
            type: String,
            default: "Belirtilmedi"
        },
        email: {
            type: String,
            default: "Belirtilmedi"
        }
    },
    controllerUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    products: {
        type: [String]
    },
    country: {
        type: String,
        default: "Türkiye"
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        default: "default.jpg"
    }
})

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;