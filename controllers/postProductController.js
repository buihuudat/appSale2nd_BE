const post_product = require("../models/post_product");

module.exports = {
  create: async (req, res) => {
    try {
      const postProduct = await post_product.create(req.body);
      return res.status(201).json(postProduct);
    } catch (e) {
      return res.status(500).json(e);
    }
  },

  update: async (req, res) => {
    try {
      const post = await post_product.findByIdAndUpdate(req.body._id, req.body);

      return res.status(200).json(post);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
  updateStatusPost: async (req, res) => {
    const { status_check_post } = req.body;
    try {
      const post = await post_product.findByIdAndUpdate(req.body._id, {
        status_check_post,
      });
      if (!post) {
        return res.status(500).json({ message: "Post not found" });
      }
      return res.status(200).json(post);
    } catch (e) {
      return res.status(500).json(e);
    }
  },

  gets: async (req, res) => {
    try {
      const posts = await post_product.find();
      return res.status(200).json(posts);
    } catch (e) {
      return res.status(500).json(e);
    }
  },

  delete: async (req, res) => {
    try {
      const post = await post_product.findByIdAndDelete(req.params.id);
      return res.status(200).json(post);
    } catch (e) {
      return res.status(500).json(e);
    }
  },
};
