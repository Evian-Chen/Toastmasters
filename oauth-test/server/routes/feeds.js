const express = require("express");
const model = require("../models");
const { createDiffieHellman } = require("crypto");

const router = express.Router();

// 回傳limit筆貼文和活動
router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const posts = await model.post.find().limit(limit).sort({ createdAt: -1 });
  const events = await model.event.find().limit(limit).sort({ createdAt: -1 });

  const allFeed = [...posts, ...events].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  ).slice(0, limit);

  res.json({
    allFeed: allFeed,
  })
});

module.exports = router;
