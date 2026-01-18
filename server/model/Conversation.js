import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
  members: [String],
});

export default mongoose.model("Conversation", ConversationSchema);
