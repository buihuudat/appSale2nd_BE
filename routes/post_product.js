const router = require("express").Router();
const { body } = require("express-validator");
const postController = require("../controllers/postProductController");

router.post(
  "/",
  body("user").isEmpty().withMessage("authentication"),
  body("title").isLength({ min: 3 }).withMessage("Tiêu đề không hợp lệ"),
  body("description")
    .isLength({ min: 10 })
    .withMessage("Nội dung không hợp lệ"),
  body("images")
    .isLength({ min: 3 })
    .withMessage("Yêu cầu tối thiểu 3 hình ảnh"),
  postController.create
);
router.get("/", postController.gets);
router.put("/", postController.update);
router.put("/update-status", postController.updateStatusPost);

module.exports = router;
