const express = require("express");
const { updateProfile  , profile , order, rankRestaurant, commentToRestaurant, addToCart, getCart, showCoupons, showPastOrders, userDetails, profileImageUploadController, userdetailsbyemail, showcategoryitems, showcategories, addToFavorites, removeFromFavorites, getFavoritesForLogged, usedCoupon, giveCoupon} = require("../../controllers/userControllers/UserControllers");
const { authMiddleware, getAdminAccess } = require("../../middlewares/authMiddleware");
const profileImageUpload = require("../../middlewares/libraries/profileImageUpload");
const User = require("../../models/User");
const router = express.Router();


const path = require("path");
router.put("/updateprofile" ,authMiddleware, updateProfile);

router.get("/profile", authMiddleware,profile)

router.post("/order", authMiddleware,order)
router.get("/userdetails/:id", authMiddleware,getAdminAccess,userDetails)
router.get("/userdetailsbyemail/:email", authMiddleware,getAdminAccess,userdetailsbyemail)

router.post("/rank", authMiddleware,rankRestaurant)
router.post("/comment", authMiddleware,commentToRestaurant)
router.post("/addToCart", authMiddleware,addToCart)
router.post("/addToFavorites", authMiddleware,addToFavorites)
router.post("/removeFromFavorites", authMiddleware,removeFromFavorites)
router.get("/getFavoritesForLogged", authMiddleware,getFavoritesForLogged)
router.get("/showCart", authMiddleware,getCart)



router.post("/usedcoupon" , authMiddleware, usedCoupon)
router.post("/givecoupon" , authMiddleware, giveCoupon)
router.get("/showCoupons", authMiddleware,showCoupons)



router.get("/showPastOrders", authMiddleware,showPastOrders)
router.get("/showcategoryitems",showcategoryitems)
router.get("/showcategories",showcategories)

router.post("/profileupload/:id" , authMiddleware , profileImageUpload.single("profile_image"),profileImageUploadController)


router.get('/profileimage/:id',async (req, res) => {
  try {

    const id = req.params.id;

    const user = await User.findById(id);
    const imagename = user.profile_image
    console.log(user);
    console.log(imagename);

    const rootDir = path.dirname(require.main.filename);
    const pathaa = path.join(rootDir,`/public/uploads/profile/${imagename}`)
    
    res.sendFile(pathaa)
    
  } catch (error) {
    console.log(error);
    res.send(error)
  }
});

module.exports = router