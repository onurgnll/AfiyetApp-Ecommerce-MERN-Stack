const express = require("express");

const { createRestaurant, deleteRestaurant, updateRestaurant } = require("../../controllers/adminControllers/adminControllers");
const {authMiddleware, getAdminAccess, getRestaurantOwnerAccess} = require("../../middlewares/authMiddleware");

const router = express.Router();


router.post("/createRestaurant" ,authMiddleware,getAdminAccess, createRestaurant)
router.delete("/deleteRestaurant/:id" ,authMiddleware,getAdminAccess, deleteRestaurant)
router.put("/updateRestaurant/:id" ,authMiddleware,getRestaurantOwnerAccess, updateRestaurant)



module.exports = router