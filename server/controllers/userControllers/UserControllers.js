
const Category = require("../../models/Category");
const Coupon = require("../../models/Coupon");
const Product = require("../../models/Product");
const Restaurant = require("../../models/Restaurant");
const User = require("../../models/User");




const updateProfile = async (req, res, next) => {

    try {
        console.log(req.body);
        const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true })

        if (updatedUser) {
            console.log(updatedUser);
            return res.status(200).json({
                success: true,
                message: "Başarı İle Güncellendi",
                updatedUser
            })

        }
        else {
            return res.status(500).json({
                success: true,
                message: "Böyle Bir Kullanıcı Bulunamadı"
            })

        }


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }


}


const profile = async (req, res, next) => {

    try {

        const user = await User.findById(req.user._id)
        return res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }




}


const order = async (req, res, next) => {
    const { items, usedCoupon, cartsumm } = req.body

    try {

        const user = await User.findById(req.user._id)

        if (user.balance > cartsumm) {

            user.pastOrders.push({ date: new Date(), products: items })


            if (usedCoupon.type != "0") {
                let found = false;
                const coupon = await Coupon.findOne({ amount: usedCoupon.amount, type: usedCoupon.type });

                user.coupons.map((couponid, index) => {
                    if (!found && String(couponid) == String(coupon._id)) {
                        user.coupons.splice(index, 1)
                        found = true;
                    }
                });

            }

            user.balance = user.balance - cartsumm;
            await user.save();
            res.status(200).json({
                success: true,
                message: "Sipariş Başarılı"
            })

        }

        else {
            res.status(500).json({
                success: false,
                message: "Yeterli Bakiyeniz Bulunmuyor"
            });

        }
    }


    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}




const usedCoupon = async (req, res, next) => {
    const { value, type } = req.body
    try {

        const user = await User.findById(req.user._id)

        const coupon = await Coupon.findOne({ value, type })

        user.coupons.map((couponid, index) => {

            if (String(couponid) == String(coupon._id)) {
                user.coupons.splice(index, 1)
            }
        })

        await user.save()

        res.status(201).json({
            success: true,
            coupons: user.coupons
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


}


const commentToRestaurant = async (req, res, next) => {
    try {

        const { comment, restaurantid } = req.body

        const restaurant = await Restaurant.findByIdAndUpdate(restaurantid, { $push: { comments: comment } }, { new: true })


        res.status(201).json({
            success: true,
            product: restaurant
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


}


const rankRestaurant = async (req, res, next) => {
    try {

        const { rank, restaurantid } = req.body

        const restaurant = await Restaurant.findByIdAndUpdate(restaurantid, { userRanked: restaurant.userRanked + 1, ranking: restaurant.ranking + rank, averageRank: restaurant.ranking / restaurant.userRanked }, { new: true })


        await Restaurant.findByIdAndUpdate(restaurantid, { averageRank: restaurant.ranking / restaurant.userRanked }, { new: true })
        res.status(201).json({
            success: true,
            product: restaurant
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }



}


const removeFromFavorites = async (req, res, next) => {
    const id = req.body.id
    try {
        const user = await User.findById(req.user._id)

        if (user.favoriteProducts.includes(id)) {
            user.favoriteProducts.map((element, index) => {
                if (element == id) {
                    user.favoriteProducts.splice(index, 1)
                }
            })

        }
        await user.save();


        res.status(201).json({
            success: true
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


}

const getFavoritesForLogged = async (req, res, next) => {

    try {
        const user = await User.findById(req.user._id)
        let products = []

        for (const element of user.favoriteProducts) {
            const product = await Product.findById(element);
            products.push(product);
        }


        res.status(201).json({
            success: true,
            products
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


}
const addToFavorites = async (req, res, next) => {
    const id = req.body.id
    try {
        const user = await User.findById(req.user._id)

        if (!user.favoriteProducts.includes(id)) {
            user.favoriteProducts.push(id);

        }
        await user.save();


        res.status(201).json({
            success: true
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const addToCart = async (req, res, next) => {
    try {
        // Input validation can be added here
        console.log(typeof req.body);
        const { cart } = req.body
        console.log(cart);

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Assuming req.body contains valid cart data
        user.cart = req.body;

        await user.save();

        return res.status(201).json({
            success: true,
            message: "Cart updated successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getCart = async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id)

        res.status(201).json({
            success: true,
            cart: user.cart
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


}

const giveCoupon = async (req, res, next) => {

    try {

        const user = await User.findById(req.user._id)
        const coupon = await Coupon.find()
        console.log(coupon);

        coupon.map((element) => {
            if(!user.coupons.includes(element._id)){
                user.coupons.push(element._id)
            }
        })

        // user.coupons = coupon.map(coupon => coupon._id);

        await user.save()

        res.status(201).json({
            success: true,
            coupons: coupon[0]._id
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


}
const showCoupons = async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id)

        let coupons = [];


        for (const couponId of user.coupons) {
            const coupon = await Coupon.findById(couponId);
            coupons.push(coupon);
        }


        res.status(201).json({
            success: true,
            coupons
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


}

const userdetailsbyemail = async (req, res, next) => {
    try {

        const user = await User.findOne({ email: req.params.email })

        if (user) {
            return res.status(200).json({
                success: true,
                user
            })

        } else {
            return res.status(404).json({
                success: false,
                message: "Böyle Bir Kullanıcı Bulunamadı"
            })
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


}


const showcategoryitems = async (req, res, next) => {
    const { name } = req.query
    try {
        let products = []
        const category = await Category.findOne({ name: name })
        for (const element of category.products) {
            const product = await Product.findById(element);
            products.push(product);
        }

        res.status(200).json({
            success: true,
            products: products
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }



}
const showcategories = async (req, res, next) => {

    try {

        const category = await Category.find();

        res.status(200).json({
            success: true,
            categories: category
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }



}


const userDetails = async (req, res, next) => {
    try {

        const user = await User.findById(req.params.id)

        res.status(200).json({
            success: true,
            user
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


}
const showPastOrders = async (req, res, next) => {
    try {

        const user = await User.findById(req.user._id)

        res.status(201).json({
            success: true,
            pastOrders: user.pastOrders
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }


}


const profileImageUploadController = async (req, res, next) => {

    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            "profile_image": req.savedImage

        }, { new: true, runValidators: true })

        res.status(200).json({
            success: true,
            user: user
        })

    } catch (error) {

        res.status(400).json({
            success: true,
            message: error.message
        })
    }

}
module.exports = {
    updateProfile,
    profile,
    order,
    rankRestaurant,
    commentToRestaurant,
    addToCart,
    getCart,
    addToFavorites,
    showCoupons,
    showPastOrders,
    showcategoryitems,
    userDetails,
    profileImageUploadController,
    giveCoupon,
    usedCoupon,
    removeFromFavorites,
    userdetailsbyemail,
    showcategories,
    getFavoritesForLogged
}
