const mongoose = require("mongoose");

const Follow = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Follow", Follow);
