import express from "express";
import Conversation from "../model/Conversation.js";

const router = express.Router();

// Create new conversation
router.post("/", async (req, res) => {
  const conv = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
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
