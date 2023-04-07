const mongoose = require("mongoose");

const Message = new mongoose.Schema(
  {
    message: {
      text: String,
      images: Array,
      file: String,
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", Message);
