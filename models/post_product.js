const mongoose = require("mongoose");

const Image = new mongoose.Schema(
  {
    url: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const Location = new mongoose.Schema(
  {
    city: String,
    district: String,
  },
  { _id: false }
);

const Post_product = new mongoose.Schema(
  {
    location: [Location],
    image: [Image],
    name: String,
    price: Number,
    category: String,
    amount: Number,
    description: String,
    discount: Number,
    status_check_post: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post_product", Post_product);
