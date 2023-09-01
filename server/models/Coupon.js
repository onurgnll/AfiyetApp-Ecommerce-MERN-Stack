const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CouponSchema = new Schema({

    amount:{
        type: Number,
        required: true
    },

    type:{
        type: String,
        enum: ["value", "percentage"],
        default: "price",
        required: true
    },

    image:{
        type:String,
        required: true
    }


})

const Coupon = mongoose.model("Coupon" , CouponSchema)

module.exports = Coupon
