const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  star: {
    type: Number,
  },
  category: {
    type: Array,
  },
  imgUrl: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  type: {
    type: String,
  }
});

module.exports = mongoose.model("products", ProductSchema);
