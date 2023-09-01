const express = require("express");
const productImageUpload = require("../../middlewares/libraries/productImageUpload");
const restaurantImageUpload = require("../../middlewares/libraries/restaurantImageUpload");
const { authMiddleware, getRestaurantOwnerAccess, getAdminAccess } = require("../../middlewares/authMiddleware");

const { addNewProduct, showRestaurant, removeProduct, updateProduct, showAllRestaurants, showAllProducts, showProductsOnRestaurant, showOpenRestaurants, productImageUploadController, restaurantImageUploadController, getrestaurantbyname, showProduct } = require("../../controllers/restaurantOwnerControllers/restaurantControllers");
const Restaurant = require("../../models/Restaurant");
const Product = require("../../models/Product");
const router = express.Router();

const path = require("path");

router.post("/addNewProduct", authMiddleware, getRestaurantOwnerAccess, addNewProduct)
router.delete("/removeProduct/:id", authMiddleware, getRestaurantOwnerAccess, removeProduct)
router.put("/updateProduct/:id", authMiddleware, getRestaurantOwnerAccess, updateProduct)

router.get("/showAllRestaurants",  showAllRestaurants)
router.get("/showAllProducts/",showAllProducts)
router.get("/showProductsOnRestaurant/:id", showProductsOnRestaurant)
router.get("/showOpenRestaurants", showOpenRestaurants)
router.get("/getrestaurantbyname/:name",getrestaurantbyname)



router.get("/showRestaurant/:id", showRestaurant)
router.get("/showProduct/:id", showProduct)


router.post("/productupload/:id", authMiddleware, getRestaurantOwnerAccess, productImageUpload.single("product_image"), productImageUploadController)
router.post("/restaurantupload/:id", authMiddleware, getRestaurantOwnerAccess, restaurantImageUpload.single("restaurant_image"), restaurantImageUploadController)

router.get('/productimage/:id', async (req, res) => {
    try {

        const id = req.params.id;

        const restaurant = await Product.findById(id);
        const imagename = restaurant.image

        const rootDir = path.dirname(require.main.filename);
        const pathaa = path.join(rootDir,`/public/uploads/product/${imagename}`) 
        res.sendFile(pathaa)

    } catch (error) {
        res.send(error)
    }
});
router.get('/restaurantimage/:id', async (req, res) => {
    try {
         const id = req.params.id;

        const restaurant = await Restaurant.findById(id);
        const imagename = restaurant.image

        const rootDir = path.dirname(require.main.filename);
        const pathaa = path.join(rootDir,`/public/uploads/restaurant/${imagename}`)
        
        res.sendFile(pathaa)

    } catch (error) {
        res.send(error)

    }
});
module.exports = router