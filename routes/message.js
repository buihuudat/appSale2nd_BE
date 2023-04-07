const messageController = require("../controllers/messageController");

const router = require("express").Router();

router.post("/add", messageController.add);

router.post("/get", messageController.get);

router.post("/list-user-chat", messageController.listUser);

router.get("/get-user-chat/:id", messageController.getListUserChat);

module.exports = router;
