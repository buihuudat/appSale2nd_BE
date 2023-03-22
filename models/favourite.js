const mongoose = require("mongoose");

const Post = new mongoose.Schema(
  {
    post_id: String,
  },
  { _id: false }
);

const Favourite = new mongoose.Schema(
  {
    user_id: String,
    post: [Post],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favourite", Favourite);
