const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ItemSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CartSchema = new Schema(
  {
    items: [ItemSchema],
    subTotal: {
      default: 0,
      type: Number,
    },
    itemCount: {
      default: 0,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("carts", CartSchema);
