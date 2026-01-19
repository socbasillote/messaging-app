import express from "express";
import Message from "../model/Message.js";

const router = express.Router();

// add message
router.post("/", async (req, res) => {
  const msg = new Message(req.body);
  const saved = await msg.save();
  res.json(saved);
});

// get messages of conversation
router.get("/:conversationId", async (req, res) => {
  const msgs = await Message.find({
    conversationId: req.params.conversationId,
  });

  res.json(msgs);
});

export default router;
