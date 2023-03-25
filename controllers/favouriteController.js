const Favourite = require("../models/favourite");

module.exports = {
  get: async (req, res) => {
    const { user_id, post_id } = req.params;
    try {
      const checkUser = await Favourite.findOne({
        user_id,
      });
      if (!checkUser) {
        return res.status(501).json([]);
      }
      const checkUserPost = await Favourite.findOne({
        user_id,
        "post.post_id": post_id,
      });
      if (!checkUserPost) {
        return res.status(502).json({});
      }
      return res.status(200).json(checkUserPost);
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
      const checkUserPost = await Favourite.findOne({
        user_id,
        "post.post_id": post_id,
      });
      if (!checkUserPost) {
        await Favourite.findOneAndUpdate(
          {
            user_id,
          },
          { $push: { post: { post_id } } }
        );
        return res.status(200).json({ status: "add" });
      }
      await Favourite.findOneAndUpdate(
        {
          user_id,
        },
        { $pull: { post: { post_id } } }
      );
      return res.status(200).json({ status: "del" });
    } catch (e) {
      return res.status(500).json(e);
    }
  },
};
