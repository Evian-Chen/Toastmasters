const express = require("express");
const model = require("../models");

const router = express.Router();

router.post("/create", async (req, res) => {
    const content = req.body.content;
    console.log(`後端接收的新一般貼文內容: ${JSON.stringify(content)}`);

    // 後端接收的新一般貼文內容: 
    // {"userEmail":"paramecium128@gmail.com","caption":"hihihihiihihihihi","likeCount":0}

    const user = await model.user.findOne({
        _id: content.userId
    });

    console.log(`找到資料: ${JSON.stringify(user)}`);

    res.json({ msg: '/create' });

    // const newDoc = await model.post.create({
    //     userId: user._id,
    //     userEmail: content.userEmail
    // })
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