const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [true,"Geçerli Bir İsim girmelisiniz"]
    },

    lastName: {
        type: String,
        required: [true,"Geçerli Bir Soyisim girmelisiniz"]
    },
    email: {
        type:String,
        required: true,
        unique: true,
        match : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profile_image : {
        type : String,
        default : "default.jpg"
    },
    pastOrders: {
        type: []
    },
    coupons: {
        type: []
    },
    cart: {
        type: []
    },
    address: {
        type: String,
        default: "Belirtilmedi"
    },
    phoneNumber: {
        type:String,
        default: "Belirtilmedi"
    },
    country: {
        type: String,
        default: "Türkiye"
    },
    favoriteRestourants: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Restaurant"
    },
    favoriteProducts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product"
    },
    role:{
        type: String,
        enum: ["user", "admin" , "owner"],
        default: "user"
    },
    balance: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,

    },
    waitingOrder: {
        type: Boolean,
        default: false
    },
    haveRestaurant: {
        type: Boolean,
        default: false
    },
    restaurants: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Restaurant"
    }


})

const User = mongoose.model("User" , UserSchema)

module.exports = User
