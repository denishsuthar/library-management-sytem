import mongoose from "mongoose";


export const connectDB = () =>{
    mongoose.connect(process.env.MONGO_URI, {
    }).then((data)=>{
        console.log(`MongoDB conneted with Host ${data.connection.host}`);
    }).catch((err)=>{
        console.log(`Cant Connect ${err}`);
    })
}