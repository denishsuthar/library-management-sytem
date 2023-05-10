import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken"


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter Name"],
    },
    email:{
        type:String,
        required:[true, "Please Enter Email"],
        unique:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:[true, "Please Enter Password"],
        select:false
    },
    role:{
        type:String,
        enum:["admin", "user"],
        default:"user",
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

// Token
userSchema.methods.getJWTToken = function(){
    return jwt.sign({_id : this._id}, process.env.JWT_SECRET,{
        expiresIn:"2d"
    })
}


export const User = mongoose.model("User", userSchema)