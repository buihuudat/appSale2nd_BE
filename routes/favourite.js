const favouriteController = require("../controllers/favouriteController");

const router = require("express").Router();

router.post("/:user_id/:post_id", favouriteController.get);
router.put("/:user_id/:post_id", favouriteController.update);

module.exports = router;
