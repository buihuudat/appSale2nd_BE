const { verifyToken } = require("../handlers/tokenHandler");
const authController = require("../controllers/authController");
const { body } = require("express-validator");
const user = require("../models/user");

const router = require("express").Router();

router.post("/login", authController.login);
router.post(
  "/register",
  body("phone").custom((value) => {
    return user.findOne({ phone: value }).then((user) => {
      if (user) {
        return res.status(500).json({
          errors: [
            {
              param: "phone",
              msg: "Số điện thoại đã được sử dụng để đăng ký",
            },
          ],
        });
      }
    });
  }),
  authController.register
);

router.post("/check-auth", verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
