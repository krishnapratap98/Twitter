import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        // basic validation
        if (!name || !username || !email || !password) {
            return res.status(401).json({
                message: "All fields are require",
                success: false
            })
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "user already exist",
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(password, 16);
        await User.create({
            name,
            username,
            email,
            password: hashedPassword
        })
        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are require",
                success: false
            })
        };
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false
            })

        }
        const tokenData = {
            userId: user._id
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" })
        return res.status(201).cookie("token", token, {
            expiresIn: "1d", httpOnly: true, secure: true,
            sameSite: 'None',
        }).json({
            message: `Welcome back ${user.name}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const logout = (req, res) => {
    return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
        message: "User logedout successfully",
        success: true
    })
}
export const bookmark = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const tweetId = req.params.id;
        const user = await User.findById(loggedInUserId);
        if (user.bookmarks.includes(tweetId)) {
            // remove
            await User.findByIdAndUpdate(loggedInUserId, { $pull: { bookmarks: tweetId } })
            return res.status(200).json({
                message: "Removed from Bookmarks"

            })
        } else {
            //bookmark
            await User.findByIdAndUpdate(loggedInUserId, { $push: { bookmarks: tweetId } })
            return res.status(200).json({
                message: "Saved to Bookmarks"

            })
        }
    } catch (error) {
        console.log(error);

    }
}
export const getMyProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select("-password");
        return res.status(200).json({
            user,
        })
    } catch (error) {
        console.log(error)
    }
}
export const getOtherUsers = async (req, res) => {
    try {
        const { id } = req.params;
        const otherUsers = await User.find({ _id: { $ne: id } }).select("-password");
        if (!otherUsers) {
            return res.status(401).json({
                message: "Corrently do not have user"
            })
        } else {
            return res.status(200).json({
                otherUsers
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const follow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId)
        if (!user.followers.includes(loggedInUserId)) {
            await user.updateOne({ $push: { followers: loggedInUserId } })
            await loggedInUser.updateOne({ $push: { following: userId } })
        } else {
            return res.status(400).json({
                message: `User already followed to ${user.name}`
            })
        };
        return res.status(200).json({
            message: `${loggedInUser.name} just follow ${user.name}`,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const unfollow = async (req, res) => {
    try {
        const loggedInUserId = req.body.id;
        const userId = req.params.id;
        const loggedInUser = await User.findById(loggedInUserId);
        const user = await User.findById(userId)
        if (loggedInUser.following.includes(userId)) {
            await user.updateOne({ $pull: { followers: loggedInUserId } })
            await loggedInUser.updateOne({ $pull: { following: userId } })
        } else {
            return res.status(400).json({
                message: `User has not follow yet`
            })
        };
        return res.status(200).json({
            message: `${loggedInUser.name} just unfollow ${user.name}`,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}