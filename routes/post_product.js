const router = require("express").Router();
const postController = require("../controllers/postProductController");
router.get("/posts", postController.gets);
router.put("/update", postController.update);
router.put("/update-status", postController.updateStatusPost);

module.exports = router;
