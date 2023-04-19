const co = require("co");
const Message = require("../models/message");
const listUserChatModel = require("../models/listUserChatModel");

module.exports = {
  add: (req, res) => {
    const { from, to, message } = req.body;
    co(function* () {
      const addMessage = yield Message.create({
        users: [from, to],
        message: {
          text: message.text,
          images: message.images,
          file: message.file,
        },
        sender: from,
        lastMessage: from,
      });
      return addMessage;
    })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  },

  get: async (req, res) => {
    const { from, to } = req.body;
    try {
      const messages = await Message.find({
        users: {
          $all: [from, to],
        },
      }).sort({ updatedAt: -1 });

      const messData = messages.map((mess) => {
        return {
          _id: mess._id,
          fromSelf: mess.sender.toString() === from,
          messages: {
            text: mess.message?.text,
            file: mess.message?.file,
            images: mess.message?.images,
          },
        };
      });
      return res.status(200).json(messData);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  getListUserChat: async (req, res) => {
    try {
      const listChat = await listUserChatModel.findOne({
        user_id: req.params.id,
      });
      return res.status(200).json(listChat);
    } catch (e) {
      return res.status(500).json(e);
    }
  },

  listUser: async (req, res) => {
    const { from, to } = req.body;
    try {
      const getListUserTo = await listUserChatModel.findOne({
        user_id: to._id,
        "userChat.user_id": from._id,
      });

      if (getListUserTo) {
        await listUserChatModel.findOneAndUpdate(
          { user_id: to._id, "userChat.user_id": from._id },
          {
            $set: {
              "userChat.$.lastMessage": req.body.message,
            },
          }
        );
      } else {
        await listUserChatModel.create({
          user_id: to._id,
          userChat: {
            user_id: from._id,
            fullname: from.fullname,
            avartar: from.avartar,
            lastMessage: req.body.message,
          },
        });
      }

      const getListUserFrom = await listUserChatModel.findOne({
        user_id: from._id,
        "userChat.user_id": to._id,
      });
      if (!getListUserFrom) {
        const createListUser = await listUserChatModel.create({
          user_id: from._id,
          userChat: {
            user_id: to._id,
            fullname: to.fullname,
            avartar: to.avartar,
            lastMessage: `Bạn: ${req.body.message}`,
          },
        });
        return res.status(201).json(createListUser);
      } else {
        const updateLastMessage = await listUserChatModel.findOneAndUpdate(
          { user_id: from._id, "userChat.user_id": to._id },
          {
            $set: {
              "userChat.$.lastMessage": `Bạn: ${req.body.message}`,
            },
          }
        );
        return res.status(201).json(updateLastMessage);
      }
    } catch (e) {
      return res.status(500).json(e);
    }
  },
};
