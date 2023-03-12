const co = require("co");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const config = process.env;

module.exports = {
  login: async (req, res) => {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(500).json({
        errors: [
          {
            param: "phone",
            msg: "Số điện thoại không đúng hoặc chưa được đăng ký",
          },
        ],
      });
    }
    const dessPass = CryptoJS.AES.decrypt(
      user.password,
      config.PASSWORD_SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (dessPass !== password) {
      return res.status(500).json({
        errors: [
          {
            param: "password",
            msg: "Mật khẩu không hợp lệ",
          },
        ],
      });
    }

    const token = jwt.sign({ id: user._id }, config.TOKEN_SECRET_KEY, {
      expiresIn: "12h",
    });

    return res.status(200).json({ token, user });
  },
  register: (req, res) => {
    const { password } = req.body;
    co(function* () {
      req.body.password = CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET_KEY
      ).toString();
      const user = yield User.create(req.body);
      const token = jwt.sign({ id: user._id }, config.TOKEN_SECRET_KEY, {
        expiresIn: "12h",
      });

      const data = yield { user, token };
      return data;
    })
      .then((data) => res.status(201).json(data))
      .catch((err) => res.status(500).json(err));
  },
};
