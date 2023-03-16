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
    user: mongoose.Types.ObjectId,
    location: [Location],
    images: [Image],
    title: String,
    price: Number,
    category: String,
    description: String,
    status_check_post: {
      type: String,
      enum: ["access", "pending", "refuse"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post_product", Post_product);
