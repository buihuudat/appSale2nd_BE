const mongoose = require("mongoose");

const User = new mongoose.Schema({
  user_id: String,
  avatar: String,
  fullname: String,
  lastMessage: String,
});

const ListUserChat = new mongoose.Schema({
  user_id: mongoose.Types.ObjectId,
  userChat: [User],
});

module.exports = mongoose.model("ListUserChat", ListUserChat);
