const Category = require("../../models/Category");
const Product = require("../../models/Product");
const Restaurant = require("../../models/Restaurant");
const User = require("../../models/User");


const createRestaurant = async(req,res,next) => {
    let a = req.body
    try {

        const owner = await User.findById(req.body.controllerUser)
        if (!owner){
            return res.status(404).json({
                success:false,
                message:"Bu Kullanıcı Bulunamadı!"
            })

        }



        const restaurant = await Restaurant.create(req.body)

        owner.restaurants = restaurant._id
        owner.role = "owner";
        await owner.save();

        
        return res.status(201).json({
            success:true,
            restaurant
        })
    
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: error.message
        })
    }
}


const deleteRestaurant = async(req,res,next) => {

    const {id} = req.params
    try {
        const restaurantt = await Restaurant.findById(id)
        const restaurant = await Restaurant.findByIdAndDelete(id)
        const user = await User.findById(restaurantt.controllerUser)

        if(restaurant){
            user.restaurants = []
            user.role = "user"
            user.save();

            restaurant.products.map(async (element) => {
                console.log(element);

                const product = await Product.findByIdAndDelete(element)

                const category = await Category.findOne({name: product.category})
                category.products.map((element,index) => {
                    if (String(element) == String(product._id)){
                        category.products.splice(index, 1)
                    }
                })

                category.save();
            })


            return res.status(200).json({
                success:true,
                message: "Restoran Başarı İle Silindi",
                restaurant:restaurantt
            })

        }
        else{
            console.log(error);
            return res.status(500).json({
                success:true,
                message: "Böyle Bir Restoran Bulunamadı"
            })

        }
        
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:true,
            message: error.message
        })
        
    }
    
}

const updateRestaurant = async (req,res,next) => {
    

    const {id} = req.params
    try {
        
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(id,req.body , {new: true})
        if(updatedRestaurant){
            return res.status(200).json({
                success:true,
                message: "Restoran Başarı İle Güncellendi", 
                updatedRestaurant
            })

        }
        else{
            return res.status(500).json({
                success:true,
                message: "Böyle Bir Restoran Bulunamadı"
            })

        }
        
        
    } catch (error) {
console.log(error);
        return res.status(500).json({
            success:true,
            message: error.message
        })
        
    }
    

}





module.exports = {
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
}