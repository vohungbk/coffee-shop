const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const verifyToken = require("../middleware/auth");

// @router GET api/products
// @desc Get all product
// @access Public
router.get("/", async (req, res) => {
  try {
    const product = await Product.find();
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @router POST api/products
// @desc Create a product
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const { name, price, star, category, imgUrl } = req.body;
  if (!name) return res.status(400).json({ success: false, message: "Name is required" });
  try {
    const newProduct = new Product({
      name,
      price,
      star,
      category: category || ["Hot"],
      imgUrl,
      user: req.userId,
    });
    await newProduct.save();
    res.json({ success: true, message: "Happy drinking!", product: newProduct });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @router PUT api/products
// @desc Update a product
// @access Private
router.put("/:id", verifyToken, async (req, res) => {
  const { name, price, star, category, imgUrl } = req.body;
  if (!name) return res.status(400).json({ success: false, message: "Name is required" });
  try {
    let updateProduct = {
      name,
      price,
      star,
      category,
      imgUrl,
    };
    const productUpdateCondition = { _id: req.params.id };
    updateProduct = await Product.findOneAndUpdate(productUpdateCondition, updateProduct, { new: true });

    if (!updateProduct)
      return res.status(401).json({
        success: false,
        message: "Product not found or user not authorised",
      });

    res.json({
      success: true,
      message: "Excellent progress!",
      product: updateProduct,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @router DELETE api/products
// @desc Delete a product
// @access Private
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const productUpdateCondition = { _id: req.params.id };
    const deleteProduct = await Product.findOneAndDelete(productUpdateCondition);
    if (!deleteProduct)
      return res.status(401).json({
        success: false,
        message: "Product not found or user not authorised",
      });

    res.json({ success: true, product: deleteProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
