const { verifyToken } = require("../handlers/tokenHandler");
const authController = require("../controllers/authController");
const { body } = require("express-validator");
const user = require("../models/user");
const validation = require("../handlers/validation");

const router = require("express").Router();

router.post("/login", authController.login);
router.post(
  "/register",
  body("msv").custom(async (msv) => {
    return await user.findOne({ msv }).then((user) => {
      if (user) {
        return Promise.reject("Mã sinh viên đã được sử dụng để đăng ký");
      }
    });
  }),
  body("email")
    .isEmail()
    .custom(async (email) => {
      return await user.findOne({ email }).then((user) => {
        if (user) {
          return Promise.reject("Email đã được sử dụng để đăng ký");
        }
      });
    }),
  body("phone").custom(async (phone) => {
    return await user.findOne({ phone }).then((user) => {
      if (user) {
        return Promise.reject("Số điện thoại đã được sử dụng để đăng ký");
      }
    });
  }),
  validation,
  authController.register
);

router.post("/check-auth", verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
