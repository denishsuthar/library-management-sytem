import { User } from "../models/userModel.js";
import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken"

export const isAuth = catchAsyncError(async(req, res, next)=>{
    const {token} = req.cookies;
    if(!token) return next(new ErrorHandler("Please Login to Access this Resourse", 401));

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData._id);

    next()
})


export const isAdmin = (req, res, next)=>{
    if(req.user.role !== "admin")
    return next(new ErrorHandler(`${req.user.role} is not allowed to access this resource`, 401));
    next();
}