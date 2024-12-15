import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js"
import tweetRoute from "./routes/tweetRoute.js"
import cors from "cors";


dotenv.config({
    path: ".env"
})
const app = express();

// middlewares
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin: ["http://localhost:3000",
        "https://twitter-git-main-krishnapratap98s-projects.vercel.app/", 
         "https://twitter-mt1uqnrg8-krishnapratap98s-projects.vercel.app/", 
         "https://twitter-ten-fawn.vercel.app/"
    ],
    credentials: true
}
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.get("/", (req, res) => {
    return res.send("backend is running")
})
app.get("/token-check", (req, res) => {
    const token = req.cookies.token;
    if (token) {

        return res.send(`cookie is set and token=${token}`)
    } else {
        return res.status(401).send('Unauthorized');
    }
})
//api
app.use("/api/v1/user", userRoute)
app.use("/api/v1/tweet", tweetRoute)


app.listen(process.env.PORT, () => {
    console.log(`Server listen at port ${process.env.PORT}`);
    databaseConnection();
})