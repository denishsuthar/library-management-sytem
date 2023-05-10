import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please Enter Book Title"],
  },
  author: {
    type: String,
    required: [true, "Please Enter Book Author"],
  },
  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
  createdBy:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
});

export const Book = mongoose.model("Book", bookSchema)