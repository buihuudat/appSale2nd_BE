const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/user", require("./users"));

module.exports = router;
