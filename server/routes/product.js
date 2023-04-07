const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

//@router GET api/products
//@desc Get all product
//@access Public
router.get("/", async (req, res) => {
  try {
    const product = new Product();
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@router POST api/products
//@desc Create a product
//@access Public
router.post("/", async (req, res) => {
  const { name, price, star, category, imgUrl } = req.body;
  if (!name) return res.status(400).json({ success: false, message: "Name is required" });
  try {
    const newProduct = new Product({
      name,
      price,
      star,
      category: category || ["Hot"],
      imgUrl: imgUrl.startsWith("https://") ? imgUrl : `https://${imgUrl}`,
    });
    await newProduct.save();
    res.json({ success: true, message: "Happy drinking!", product: newProduct });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
