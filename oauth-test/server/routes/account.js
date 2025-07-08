require("dotenv").config();
const express = require("express");
const model = require("../models");

const router = express.Router();

// 更新密碼
router.post("/password/new", async (req, res) => {
    const curUser = await model.user.findOne({
        email: req.body.email,
        password: req.body.currentPassword
    });

    // 舊密碼必須正確才能變更密碼
    if (!curUser) {
        console.log("201");
        res.status(201).json({ message: "舊密碼錯誤" });
        return;
    }

    try {
        const newUser = await model.user.updateOne(
            { email: req.body.email, password: req.body.currentPassword },
            { password: req.body.newPassword }
        );
        if (newUser) {
            res.json({ message: "更新密碼完成" });
        }
    } catch(err) {
        console.log(`更新密碼錯誤: ${err}`);
        res.status(500).json({ message: "更新密碼錯誤" });
    }
})

// 更新個人資料
router.post("/profile/new", async (req, res) => {
    const result = await model.user.findOneAndUpdate({
        email: req.body.oldData.email
    }, {
        avatar: req.body.newData.avatar,
        displayName: req.body.newData.displayName,
        realName: req.body.newData.realName,
        phone: req.body.newData.phone,
        birthday: req.body.newData.birthday,
        bio: req.body.newData.bio,
        location: req.body.newData.location,
        clubs: req.body.newData.clubs
    }, {
        new: true
    });

    res.json({ message: "/account/profile/new", updatedData: result });
})

// 更新隱私設定
router.post("/privacy/new", async (req, res) => {
    console.log(JSON.stringify(req.body.newData))
    const result = await model.user.findOneAndUpdate({
        email: req.body.email
    }, {
        privacy: req.body.newData
    }, {
        new: true
    });

    console.log(`updated privacy: ${result}`);
    res.json({ message: "/account/privacy/new" });
})

// 更新通知設定
router.post("/notifications/new", (req, res) => {
    res.json({ message: "/account/notifications/new" });
})

// 更新個人頭像
router.post("/profile/avatar/new", (req, res) => {
    res.json({ message: "/account/profile/avatar/new" });
})

module.exports = router;