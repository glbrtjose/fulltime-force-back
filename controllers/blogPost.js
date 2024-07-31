const express = require("express");
const router = express.Router();
const BlogPost = require("../models/BlogPost");

// Get all blogposts
router.get("/blogposts", async (req, res) => {
  try {
    const plogPosts = await BlogPost.find();
    const result = {
      result: plogPosts,
      next: false,
    };
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a single blogpost by ID
router.get("/blogposts/:id", async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ error: "BlogPost not found" });
    }
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a blogposts
router.post("/blogposts", async (req, res) => {
  try {
    const { body } = req;
    const blogPost = await BlogPost.create(body);
    if (!blogPost) {
      return res.status(404).json({ error: "BlogPost not found" });
    }
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a blogposts
router.patch("/blogposts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { body } = req;
    const blogPost = await BlogPost.findByIdAndUpdate(id, body);
    if (!blogPost) {
      return res.status(404).json({ error: "BlogPost not found" });
    }
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a blogpost by ID
router.delete("/blogposts/:id", async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ error: "BlogPost not found" });
    }
    res.json(blogPost);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
