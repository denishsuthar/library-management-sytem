import express from "express";
import { config } from "dotenv";
import ErrorMidelware from "./middelware/error.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())

// Config
config({
    path:"./config/config.env"
})

app.get("/", (req, res)=>{
    res.send("Welcome")
})

// Importing & Using Route
import userRoute from "./routes/userRoute.js"
import bookRoute from "./routes/bookRoute.js"
app.use("/api/v1", userRoute)
app.use("/api/v1", bookRoute)


export default app

// Using Custome ErrorMiddelware
app.use(ErrorMidelware)