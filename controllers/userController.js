const { co } = require("co");
const User = require("../models/user");
const validator = require("validator");
const CryptoJS = require("crypto-js");

module.exports = {
  gets: (req, res) => {
    co(function* () {
      const users = yield User.find();
      return users;
    })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  },
  get: (req, res) => {
    co(function* () {
      const user = yield User.findById(req.params.id);
      return user;
    })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  },
  update: async (req, res) => {
    const { password } = req.body;
    try {
      const user = await User.findById(req.body._id);
      if (user.password !== req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          password,
          process.env.PASSWORD_SECRET_KEY
        ).toString();
      }

      const rs = await User.findByIdAndUpdate(req.params.id, req.body);
      return res.status(200).json(rs);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  delete: (req, res) => {
    co(function* () {
      yield User.findByIdAndRemove(req.params.id);
      return Promise.reject({
        success: true,
        message: "Đã xóa người dùng thành công",
      });
    })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  },

  changeAvatar: (req, res) => {
    co(function* () {
      const user = yield User.findByIdAndUpdate(req.params.id, {
        avatar: req.body.avatar,
      });
      return user;
    })
      .then((data) => res.status(200).json(data))
      .catch((err) => res.status(500).json(err));
  },
  find: async (req, res) => {
    const { username, phone, email } = req.body;
    const checkUsername = req.body.username
      ? await User.findOne({ username })
      : null;
    if (checkUsername) {
      return res.status(500).json({
        errors: [
          {
            param: "username",
            msg: "Tên người dùng đã được sử dụng",
          },
        ],
      });
    }
    const checkPhone = phone ? await User.findOne({ phone }) : null;
    if (checkPhone) {
      return res.status(500).json({
        errors: [
          {
            param: "phone",
            msg: "Số điện thoại này đã được sử dụng",
          },
        ],
      });
    }
    if (email && !validator.isEmail(email)) {
      return res.status(500).json({
        errors: [
          {
            param: "email",
            msg: "Email không hợp lệ",
          },
        ],
      });
    }
    const checkEmail = email ? await User.findOne({ email }) : null;
    if (checkEmail) {
      return res.status(500).json({
        errors: [
          {
            param: "email",
            msg: "Email này đã được sử dụng",
          },
        ],
      });
    }
    if (checkEmail || checkPhone || checkUsername) {
      return res.status(200).json(checkEmail || checkPhone || checkUsername);
    }
    return res.status(200).json(username || phone || email);
  },
};
