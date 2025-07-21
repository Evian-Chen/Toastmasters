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
    const postId = req.query.postId;
    const post = req.body.post;
    const result = await model.post.updateOne({
        postId: postId
    }, {
        caption: post.caption,
    }, {
        new: true
    });

    console.log(`後端更新資料: ${JSON.stringify(result)}`);
    res.json({ msg: "ok." });
})

// TODO
// 對貼文更新喜歡
router.post('/like', async (req, res) => {
    const { isLiked, postId, userId } = req.body;

    try {
        const [postRes, userRes] = await Promise.all([
            await model.post.findByIdAndUpdate(userId, 
                isLiked ? 
                { $inc: { likeCount: 1 }, $addToSet: { likedBy: userId } } : 
                { $inc: { likeCount: -1 }, $pull: { likedBy: userId } }
            ),

            await model.user.findByIdAndUpdate(userId, 
                isLiked ? 
                { $addToSet: { likedPosts: postId } } : 
                { $pull: { likedPosts: postId } }
            )
        ]);

        console.log(`後端使用者資料: ${JSON.stringify(userRes)}`);
        console.log(`後端按讚資料: ${JSON.stringify(postRes)}`);
        res.json({ 
            msg: "ok",
            likeCount: postRes.likeCount
        });
    } catch (err) {
        console.error(`後端按讚錯誤: ${err}`);
        res.status(500).json({ msg: "按讚失敗", error: err.message });
    }
});

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