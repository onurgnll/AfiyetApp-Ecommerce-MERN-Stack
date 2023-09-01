const express = require("express");
const userRouters = require("./userRouters/userRouters.js");
const adminRouters = require("./adminRouters/adminRouters.js");
const restaurantRouters = require("./restourantRouters/restaurantRouters.js");
const authRouters = require("./authRouters.js");
const router = express.Router();


router.get("/" , (req,res,next) => {
    res.send("salam")
})

router.use("/user" , userRouters)
router.use("/admin" , adminRouters)
router.use("/restaurant" , restaurantRouters)



router.use("/auth" , authRouters)

module.exports = router