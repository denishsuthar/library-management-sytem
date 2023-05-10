import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "denied"],
    default: "pending",
  },
  requestedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Request = mongoose.model("Request", requestSchema);
