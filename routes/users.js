const userController = require("../controllers/userController");
const router = require("express").Router();
const { body } = require("express-validator");
const validation = require("../handlers/validation");
const user = require("../models/user");

// router.post("/:id", userController.find);
router.get("/:id", userController.get);
router.put("/change-avatar/:id", userController.changeAvatar);
router.put(
  "/:id",
  body("fullname")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("Tên không hợp lệ"),
  body("msv")
    .isLength({ min: 9, max: 11 })
    .withMessage("Mã sinh viên không hợp lệ")
    .custom(async (msv) => {
      return await user.findOne({ msv }).then((user) => {
        if (user) {
          return Promise.reject("Mã sinh viên này đã được sử dụng");
        }
      });
    }),
  body("email")
    .isEmpty()
    .withMessage("Email không được để trống")
    .isEmail()
    .withMessage("Email không hợp lệ"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Mật khẩu yêu cầu tối thiểu 8 kí tự"),
  body("password").notEmpty().withMessage("Vui lòng chọn địa chỉ"),
  validation,
  userController.update
);
router.patch("/:id", userController.delete);
router.get("/", userController.gets);

module.exports = router;
