const Follow = require("../models/follow");

module.exports = {
  getFollowers: async (req, res) => {
    try {
      const userId = req.params.userId;
      const follow = await Follow.findOne({ username: userId }).populate(
        "followers"
      );
      return res.status(200).json(follow.followers);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getFollowing: async (req, res) => {
    try {
      const userId = req.params.userId;
      const follow = await Follow.findOne({ username: userId }).populate(
        "following"
      );
      return res.status(200).json(follow.following);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  followUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const followId = req.body.follower;

      const followedUser = await Follow.findOneAndUpdate(
        { username: userId },
        { $push: { following: followId } },
        { new: true, upsert: true }
      );
      const followerUser = await Follow.findOneAndUpdate(
        { username: followId },
        { $push: { followers: userId } },
        { new: true, upsert: true }
      );
      return res.status(200).json({ followedUser, followerUser });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  unfollowUser: async (req, res) => {
    try {
      const userId = req.params.userId;
      const followId = req.params.follower;

      const followedUser = await Follow.findOneAndUpdate(
        { username: userId },
        { $pull: { following: followId } }
      );
      const followerUser = await Follow.findOneAndUpdate(
        { username: followId },
        { $pull: { followers: userId } }
      );
      return res.status(200).json({ followedUser, followerUser });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
