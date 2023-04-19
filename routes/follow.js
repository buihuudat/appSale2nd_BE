const route = require("express").Router();
const followController = require("../controllers/followController");

route.get("/followers/:userId", followController.getFollowers);
route.get("/following/:userId", followController.getFollowing);
route.post("/:userId", followController.followUser);
route.delete("/unfollow/:userId/:follower", followController.unfollowUser);

module.exports = route;
