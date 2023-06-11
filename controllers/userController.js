import { User } from "../models/userModel.js";
import {catchAsyncError} from "../middelware/catchAsyncError.js"
import ErrorHandler from "../utils/errorHandler.js";
import {sendToken} from "../utils/sendToken.js"

// Register
export const registerUser = catchAsyncError(async(req, res, next)=>{
    const {name, email, password} = req.body;
    if(!name || !email || !password) return next(new ErrorHandler("Please Fill All Fields", 400))

    let user = await User.findOne({email});
    if(user) return next(new ErrorHandler("User Alredy Registred you can Login", 400))

    user = await User.create({
        name, email, password
    })

    sendToken(res, user, "Registred", 201)
})

// Login
export const loginUser = catchAsyncError(async(req, res, next)=>{
    const {email, password} = req.body;
    if(!email || !password) return next(new ErrorHandler("Please Fill All Fields", 400));

    const user = await User.findOne({email}).select("+password");
    if(!user) return next(new ErrorHandler("Incorrect Email", 401));

    if(user.password === password){
        sendToken(res,user, `Welcome Back ${user.name}`,200)
    }
    else{
        return next(new ErrorHandler("Incorrect Password", 401))
    }
})

// Logout
export const logout = catchAsyncError(async(req, res, next)=>{
    res.status(200).cookie("token", null, {
        expires:new Date(Date.now()),
        httpOnly:true,
        // secure:true,
        // sameSite:"none"
    }).json({
        success:true,
        message:"Logout Successfully"
    })
})

// My Profile
export const myProfile = catchAsyncError(async(req, res, next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    })
})

// Update Profile
export const updateProfile = catchAsyncError(async(req, res, next)=>{
    const {name, email} = req.body;

    const user = await User.findById(req.user.id);
    if(name) user.name = name;
    if(email) user.email = email;
    
    await user.save();

    res.status(200).json({
        success:true,
        user
    })
})

// All Users --Admin
export const allUsers = catchAsyncError(async(req, res, next)=>{
    const users = await User.find();
    res.status(200).json({
        success:true,
        users
    })
})


//Delete User --Admin
export const deleteUser = catchAsyncError(async(req, res, next)=>{
    const user = await User.findById(req.params.id);
    if(!user) return next(new ErrorHandler("User Not Found", 404));

    await user.deleteOne();

    res.status(200).json({
        success:true,
        message:"user deleted Succesfully"
    })
})

// Any User Profile -- Admin
export const anyUserProfile = catchAsyncError(async(req, res, next)=>{
    const user = await User.findById(req.params.id);
    if(!user) return next(new ErrorHandler("User Not Found", 404));
    res.status(200).json({
        success:true,
        user
    })
})