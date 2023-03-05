const mongoose = require("mongoose");

const Favorite = new mongoose.Schema(
  {
    user_id: String,
    product: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", Favorite);
