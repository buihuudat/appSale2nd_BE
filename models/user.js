const mongoose = require("mongoose");

const Follow = new mongoose.Schema({
  follower: {
    type: Number,
    default: 0,
  },
  following: {
    type: Number,
    default: 0,
  },
});

const User = new mongoose.Schema(
  {
    msv: String,
    fullname: String,
    email: {
      type: String,
    },
    password: String,
    phone: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
      default: "",
    },
    role: {
      type: Number,
      default: 2,
    },
    sex: {
      type: String,
    },
    avatar: {
      type: String,
      default: "",
    },
    follow: [Follow],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
