const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const verifyToken = require("../middleware/auth");

// @router POST api/auth/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) return res.status(400).json({ success: false, message: "Missing email and/or password" });
  try {
    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ success: false, message: "Email already taken" });

    const hashPassword = await argon2.hash(password);
    const newUser = new User({
      email,
      password: hashPassword,
      firstName,
      lastName,
    });
    console.log("22",newUser);
    await newUser.save();
    console.log("22");
    const accessToken = jwt.sign({ userId: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @router POST api/auth/login
// @desc Login
// @access Public
router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ success: false, message: "Missing email and/or password" });
  try {
    console.log(req.body);
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Incorrect email or password" });
    const passwordInvalid = await argon2.verify(user.password, password);
    if (!passwordInvalid) return res.status(400).json({ success: false, message: "Incorrect email or password" });
    const accessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET);
    res.json({
      success: true,
      message: "Logged successfully",
      accessToken,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @router GET api/auth/me
// @desc Get user profile
// @access Private
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ success: true, user: user });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
