const Favourite = require("../models/favourite");

module.exports = {
  get: async (req, res) => {
    const { user_id, post_id } = req.params;
    try {
      const favouritePost = await Favourite.findOne({
        user_id,
        "post.post_id": post_id,
      });
      if (!favouritePost) {
        return res.status(502).json({});
      }
      return res.status(200).json(favouritePost);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  update: async (req, res) => {
    const { user_id, post_id } = req.params;
    const data = {
      user_id,
      post: {
        post_id,
      },
    };
    try {
      const checkUser = await Favourite.findOne({
        user_id,
      });
      if (!checkUser) {
        const favourite = await Favourite.create(data);
        return res.status(201).json({ favourite, status: "add" });
      }

      const updateData = {};
      let status = "del";
      const checkUserPost = await Favourite.findOneAndUpdate(
        {
          user_id,
          "post.post_id": post_id,
        },
        { $pull: { post: { post_id } } },
        { new: true }
      );
      if (!checkUserPost) {
        updateData.$push = { post: { post_id } };
        status = "add";
      } else {
        updateData.$pull = { post: { post_id } };
      }
      const updatedFavourite = await Favourite.findOneAndUpdate(
        {
          user_id,
        },
        updateData,
        { new: true }
      );
      return res.status(200).json({ status });
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  gets: async (req, res) => {
    const { user_id } = req.params;
    try {
      const posts = await Favourite.find({ user_id });
      return res.status(200).json(posts);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
};
