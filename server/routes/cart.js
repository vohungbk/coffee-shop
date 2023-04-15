const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
const Product = require("../models/Product");

//@router GET api/cart
//@desc Get all item of cart
//@access Public
router.get("/", async (req, res) => {
  try {
    let cart = await Cart.find();
    if (cart?.length) {
      cart[0].itemCount = cart?.[0].items.length ? cart?.[0].items.map((item) => item.quantity)?.reduce((acc, next) => acc + next) : 0;
      res.json({ success: true, cart: cart?.[0] });
    }
  } catch (error) {
    console.log({ error });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@router POST api/cart/addToCart
//@desc Add new item to cart
//@access Public
router.post("/addToCart", async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId) return res.status(400).json({ success: false, message: "Bad request" });

  try {
    let carts = await Cart.find().populate({
      path: "items.productId",
      select: "name price total",
    });
    let cart = carts?.[0];
    let productDetails = await Product.findById(productId);
    if (!productDetails) {
      return res.status(500).json({
        message: "Invalid request",
        success: false,
      });
    }
    if (cart) {
      //---- Check if index exists ----
      const indexFound = cart.items.findIndex((item) => item?.productId?.id == productId);
      //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
      if (indexFound !== -1 && quantity <= 0) {
        cart.items.splice(indexFound, 1);
        if (cart.items.length == 0) {
          cart.subTotal = 0;
        } else {
          cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
        }
      }
      //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
      else if (indexFound !== -1) {
        cart.items[indexFound].quantity = quantity;
        cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
        cart.items[indexFound].price = productDetails.price;
        cart.items[indexFound].name = productDetails.name;
        cart.items[indexFound].imgUrl = productDetails.imgUrl;
        cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
      }
      //----Check if quantity is greater than 0 then add item to items array ----
      else if (quantity > 0) {
        cart.items.push({
          productId: productId,
          quantity: quantity,
          price: productDetails.price,
          name: productDetails.name,
          imgUrl: productDetails.imgUrl,
          total: parseInt(productDetails.price * quantity),
        });
        cart.subTotal = cart.items.map((item) => item.total).reduce((acc, next) => acc + next);
      }
      //----If quantity of price is 0 throw the error -------
      else {
        return res.status(400).json({
          type: "Invalid",
          message: "Invalid request",
        });
      }
      let data = await cart.save();
      res.status(200).json({
        success: true,
        message: "Process successful",
        data: data,
      });
    }
    //------------ This creates a new cart and then adds the item to the cart that has been created------------
    else {
      const cartData = {
        items: [
          {
            productId: productId,
            quantity: quantity,
            total: parseInt(productDetails.price * quantity),
            price: productDetails.price,
            name: productDetails.name,
            imgUrl: productDetails.imgUrl,
          },
        ],
        subTotal: parseInt(productDetails.price * quantity),
      };
      cart = await Cart.create(cartData);
      res.json({ success: true, cart });
    }
  } catch (error) {
    console.log({ error });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@router POST api/cart/emptyCart
//@desc Remove all item from cart
//@access Public
router.post("/emptyCart", async (req, res) => {
  try {
    let carts = await Cart.find().populate({
      path: "items.productId",
      select: "name price total",
    });
    const cart = carts?.[0];
    cart.items = [];
    cart.subTotal = 0;
    let data = await cart.save();
    res.status(200).json({
      type: "success",
      mgs: "Cart has been emptied",
      data: data,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// router.delete("/:id", async (req, res) => {
//   const productId = req.params.id;
//   if (!productId) return res.status(400).json({ success: false, message: "Bad request" });
//   try {
//     let carts = await Cart.find().populate({
//       path: "items.productId",
//       select: "name price total",
//     });
//     const cart = carts?.[0];

//     console.log({ cart });
//   } catch (error) {
//     console.log({ error });
//   }
// });

module.exports = router;
