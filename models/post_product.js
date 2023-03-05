const mongoose = require("mongoose");

const Image = new mongoose.Schema({
  url: {
    type: String,
    default: "",
  },
});

const Post_product = new mongoose.Schema(
  {
    image: [Image],
    name: String,
    price: Number,
    category: String,
    amount: Number,
    description: String,
    discount: Number,
    status_check_post: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post_product", Post_product);
