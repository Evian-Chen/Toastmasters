const express = require("express");
const model = require("../models");

const router = express.Router();

router.post("/create", async (req, res) => {
    const content = req.body.content;

    // 儲存新貼文到資料庫
    const savedData = await model.post.create({
        userId: content.userId,
        userEmail: content.userEmail,
        caption: content.caption,
        likeCount: content.likeCount
    })
    console.log(`儲存資料: ${JSON.stringify(savedData)}`);

    res.json({ msg: 'ok' });
})

router.get("/:id", (req, res) => {
    const postId = req.params.id;
    res.json({ msg: '/create' });
})

router.delete("/:id", (req, res) => {
    const postId = req.params.id;
    res.json({ msg: '/create' })
})

module.exports = router;