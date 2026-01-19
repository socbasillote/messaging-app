import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const hashed = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
    });

    await user.save();
    res.status(201).send("registered");
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) return res.status(400).send("no user");

  const valid = await bcrypt.compare(req.body.password, user.password);

  if (!valid) return res.status(400).send("wrong pass");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ user, token });
});

export default router;
