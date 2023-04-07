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
router.get("/:id", postController.get);
router.post("/:user_id", postController.userGet);
router.put("/", postController.update);
router.put("/:id", postController.updateStatusPost);
router.delete("/:id", postController.delete);

module.exports = router;
