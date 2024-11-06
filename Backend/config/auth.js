
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
    path: "../config/.env"
})

const isAuthenticated = async (req, res, next) => {
    try {
        const  token  = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            })
        }
        const decode = await jwt.verify(token, process.env.TOKEN_SECRET)
        next();
        req.user = decode.userId
    } catch (error) {
        console.log(error);
    }
}
export default isAuthenticated;