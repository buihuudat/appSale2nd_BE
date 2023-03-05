const { verifyToken } = require("../handlers/tokenHandler");
const authController = require("../controllers/authController");

const router = require("express").Router();

router.post("/login", authController.login);
router.post("/register", authController.register);

router.post("/check-auth", verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;
