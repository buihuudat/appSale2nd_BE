const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/user", require("./users"));
router.use("/post", require("./post_product"));
router.use("/favourite", require("./favourite"));

module.exports = router;
