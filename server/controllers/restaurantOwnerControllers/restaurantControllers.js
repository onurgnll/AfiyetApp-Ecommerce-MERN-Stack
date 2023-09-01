const Category = require("../../models/Category");
const Product = require("../../models/Product");
const Restaurant = require("../../models/Restaurant");


const addNewProduct = async (req, res, next) => {
    console.log(req.body);
    try {
        const { name, price, description, categoryname , restaurantid} = req.body
        const isRestaurantControllerUser = await Restaurant.findOne({ controllerUser: req.user._id })
        if (!isRestaurantControllerUser && !(req.user.role == "admin")) {

                return res.status(404).json({
                     success: false,
                     message: "Restoran Sahibi Değilsiniz"
                 })

            
        }
        console.log("geçti");
        let isCategory = await Category.findOne({ name: categoryname })

        if (!isCategory) {
            isCategory = await Category.create({ name: categoryname })
        }
        const restaurantt = await Restaurant.findById(restaurantid)
        const product = await Product.create({
            name,
            price,
            restaurantname: restaurantt.name,
            restaurantid,
            description,
            category: categoryname
        })
        console.log(product);
        console.log(restaurantt);

        isCategory.products.push(product);
        isCategory.save();

        const restaurant = await Restaurant.findByIdAndUpdate(restaurantid, { $push: { products: product._id } }, { new: true })


        res.status(201).json({
            success: true,
            product: product
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}


const removeProduct = async (req, res, next) => {
    const id = req.params.id
    try {

        const product = await Product.findByIdAndDelete(id)

        const restaurant = await Restaurant.findById(product.restaurantid)
        restaurant.products.map((element,index) => {
            if(element == product._id){
                restaurant.products.splice(index,1)
            }
        })
        restaurant.save();
        
        const category = await Category.findOne({name: product.category})
        category.products.map((element,index) => {
            if(String(element) == String(product._id)){
                category.products.splice(index,1)
            }
        })
        category.save();

        res.status(200).json({
            success: true,
            message: "Ürün Başarı İle Silindi",
            product
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: true,
            message: error.message
        })


    }
}


const updateProduct = async (req, res, next) => {
    const id = req.params.id

    const {category} = req.body

    try {
        const productt = await Product.findById(id)
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true })



        const categoryeski = await Category.findOne({name: productt.category})
        if(categoryeski){
            categoryeski.products.map((element,index) => {
                if(String(element) == String(product._id)){
                    categoryeski.products.splice(index,1)
                }
            })
            categoryeski.save();

        }
        let categoryyeni = await Category.findOne({name: category})
        if (!categoryyeni) {
            categoryyeni = await Category.create({ name: category })
        }
        categoryyeni.products.push(product._id)
        categoryyeni.save()


        res.status(200).json({
            success: true,
            message: "Ürün Başarı İle Güncellendi",
            product
        })
    } catch (error) {
console.log(error);
        res.status(500).json({
            success: true,
            message: error.message
        })


    }
}



const showAllRestaurants = async (req, res, next) => {

    try {

        const restaurants = await Restaurant.find()
        res.status(200).json({
            success: true,
            restaurants
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }


}


const showOpenRestaurants = async (req, res, next) => {

    try {

        const restaurants = await Restaurant.find({ isOpen: true })
        res.status(200).json({
            success: true,
            restaurants
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }


}

const showProduct = async (req, res, next) => {

    const id = req.params.id

    try {

        const product = await Product.findById(id)
        res.status(200).json({
            success: true,
            product
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }


}
const showRestaurant = async (req, res, next) => {

    const id = req.params.id

    try {

        const restaurant = await Restaurant.findById(id)
        res.status(200).json({
            success: true,
            restaurant
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }


}
const getrestaurantbyname = async (req, res, next) => {

    const {name} = req.params

    try {

        const restaurant = await Restaurant.findOne({name})

        if(restaurant){
            res.status(200).json({
                success: true,
                restaurant
            })

        }else{
            res.status(400).json({
            success: false,
            message: "bulunamadı"
        })

        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }


}



const showAllProducts = async (req, res, next) => {

    try {

        const products = await Product.find()
        res.status(200).json({
            success: true,
            products
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }


}


const showProductsOnRestaurant = async (req, res, next) => {
    const id = req.params.id
    try {
        let products = []
        const restaurant = await Restaurant.findById(id)

        if (restaurant.products != []) {
            await Promise.all(restaurant.products.map(async (e) => {
                const a = await Product.findById(e)
                products.push(a)


            }))

        }

        res.status(200).json({
            success: true,
            products
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

    }
}



const productImageUploadController = async(req,res,next) => {
    
    try {
        const product = await Product.findByIdAndUpdate(req.params.id , {
            "image": req.savedImage
    
        },{new: true , runValidators: true})
        
        res.status(200).json({
            success:true, 
            product
        })
        
    } catch (error) {
        
        res.status(400).json({
            success:true, 
            message: error.message
        })
    }
}


const restaurantImageUploadController = async(req,res,next) => {
    

    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id , {
            "image": req.savedImage
    
        },{new: true , runValidators: true})
        
        res.status(200).json({
            success:true, 
            restaurant
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:true, 
            message: error.message
        })
    }


}


module.exports = {
    addNewProduct,
    removeProduct,
    updateProduct,
    restaurantImageUploadController,
    productImageUploadController,
    getrestaurantbyname,
    showAllProducts,
    showAllRestaurants,
    showProductsOnRestaurant,
    showRestaurant,
    showOpenRestaurants,
    showProduct
}