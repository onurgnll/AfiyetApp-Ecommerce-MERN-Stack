const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const dotenv = require("dotenv");
dotenv.config();

const register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body

            const temp = await User.findOne({email})
            if(temp){
                return res.status(401).json({
                    success: false,
                    message: "Bu Email Zaten Kullanılıyor"
               })

            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const data = {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            }


            const user = await User.create(data)



            const token = jwt.sign({ _id: user._id,role: user.role, firstName: user.firstName, lastName: user.lastName, email: user.email }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE })


            return res.status(201).json({
                success: true,
                user: user,
                token
            })


    } catch (error) {
        console.log(error.message);
        const a = error.message.split(":")
         return res.status(500).json({
             success: false,
             message: a[2] || error.message
        })

    }

    

}



const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email })
        if (user) {

            const comparePasswords = await bcrypt.compare(password,user.password )
            if (comparePasswords) {




                const token = jwt.sign({ _id: user._id,role: user.role, firstName: user.firstName, lastName: user.lastName, email: user.email }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE })

                return res.status(200).json({
                    success: true,
                    user: user,
                    token


                })
            }
            else(
                res.status(401).json({
                    success: false,
                    message: "Girdiğiniz şifre yanlış"
        
        
                })
            )
        }
        else(
            res.status(401).json({
                success: false,
                message: "Böyle Bir Kullanıcı Bulunamadı"
    
    
            })
        )

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message


        })
    }
}
















module.exports = {
    register,
    login
}