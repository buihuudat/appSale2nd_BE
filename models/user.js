const mongoose = require("mongoose");

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
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
