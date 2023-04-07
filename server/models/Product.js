const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = Schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  star: {
    type: Number,
  },
  category: {
    type: Array,
  },
  imgUrl: {
    type: String,
  },
});

module.exports = mongoose.model("products", ProductSchema);
