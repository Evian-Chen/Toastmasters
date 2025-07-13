const express = require("express");
const model = require("../models");
const crypto = require('crypto');

const router = express.Router();

router.post("/create", async (req, res) => {
    const content = req.body.content;

    // 儲存新貼文到資料庫
    const savedData = await model.post.create({
        postId: crypto.randomUUID(),
        userId: content.userId,
        userEmail: content.userEmail,
        caption: content.caption,
        likeCount: content.likeCount
    })
    console.log(`儲存資料: ${JSON.stringify(savedData)}`);

    res.json({ msg: 'ok' });
})

// router.get("/:id", (req, res) => {
//     const postId = req.params.id;

//     res.json({ msg: '/create' });
// })

// 取得最新的一百則貼文，提供顯示在PostFeedView
router.get("/", (req, res) => {
    const postId = req.params.id;

    res.json({ msg: '/create' });
})

// 從PostCardView.vue做請求
router.delete("/:id", (req, res) => {
    const postId = req.params.id;
    res.json({ msg: '/create' })
})

module.exports = router;