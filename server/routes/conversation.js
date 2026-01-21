import express from "express";
import Conversation from "../model/Conversation.js";

const router = express.Router();

// Create new conversation
router.post("/", async (req, res) => {
  const { senderId, receiverId } = req.body;

  // 1. check if conversation already exists
  const existing = await Conversation.findOne({
    members: { $all: [senderId, receiverId] },
  });

  if (existing) {
    return res.json(existing);
  }

  // 2. if not -> create new
  const conv = new Conversation({
    members: [senderId, receiverId],
  });

  const saved = await conv.save();
  res.json(saved);
});

// get conversations of user
router.get("/:userId", async (req, res) => {
  const list = await Conversation.find({
    members: { $in: [req.params.userId] },
  });

  res.json(list);
});

export default router;
