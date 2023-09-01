const jwt = require("jsonwebtoken");
const User = require("../models/User");


const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]

        if (!token) {
            return res.json({
                success: false,
                message: "Token Bulunamadı"
            })
        }
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            req.user = {
                _id: decodedToken._id,
                firstName: decodedToken.firstName,
                lastName: decodedToken.lastName,
                email: decodedToken.email,
                role: decodedToken.role

            };
            next();
        });

    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Giriş Yapmadınız"

        })


    }



}

const getAdminAccess = async (req, res, next) => {

    const id = req.user._id;

    try {
        const admin = await User.findById(id);
        if (admin.role == "admin") {
            next()
        }
        else (
            res.status(401).json({
                success: false,
                message: "Bu kısıma sadece adminler erişebilir"
            })
        )



    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Bu kısıma sadece adminler erişebilir"
        })
    }




}

const getRestaurantOwnerAccess = async (req, res, next) => {

    const id = req.user._id;

    try {
        const owner = await User.findById(id);
        if (owner.role == "owner" || owner.role == "admin") {
            next()
        }
        else (
            res.status(401).json({
                success: false,
                message: "Bu kısıma sadece restoran sahipleri erişebilir"
            })
        )



    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Bu kısıma sadece restoran sahipleri erişebilir"
        })
    }




}


module.exports = {
    authMiddleware,
    getAdminAccess, getRestaurantOwnerAccess
}