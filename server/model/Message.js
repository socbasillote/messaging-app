import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  conversationId: String,
  sender: String,
  text: String,
});

export default mongoose.model("Message", MessageSchema);
