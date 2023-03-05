const userController = require("../controllers/userController");
const router = require("express").Router();

router.post("/find", userController.find);
router.post("/:id", userController.get);
router.put("/change-avatar/:id", userController.changeAvatar);
router.put("/:id", userController.update);
router.patch("/:id", userController.delete);
router.get("/", userController.gets);

module.exports = router;
