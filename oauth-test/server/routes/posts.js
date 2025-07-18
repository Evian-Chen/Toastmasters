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

router.post('/update', async (req, res) => {
    //
})

// 從PostCardView.vue做請求
router.delete("/:id", async (req, res) => {
    const postId = req.params.id;
    const result = await model.post.deleteOne({
        postId: postId
    }, {
        new: true
    });

    console.log(`後端刪除資料: ${JSON.stringify(result)}`);
    res.json({ msg: '/delete ok' })
})

module.exports = router;