const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/user", require("./users"));
router.use("/post", require("./post_product"));
router.use("/favourite", require("./favourite"));
router.use("/message", require("./message"));
router.use("/follow", require("./follow"));

module.exports = router;
