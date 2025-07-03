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
    // const newProfile = {
    //     avatar: req.body.newData.avatar,
    //     displayName: req.body.newData.displayName,
    //     realName: req.body.newData.realName,
    //     email: req.body.newData.email,
    //     phone: req.body.newData.phone,
    //     birthday: req.body.newData.birthday,
    //     bio: req.body.newData.bio,
    //     location: req.body.newData.location
    // };
    // const newClubs = req.body.newData.clubs;

    const result = await model.user.findOneAndUpdate({
        email: req.body.oldData.email
    }, {
        avatar: req.body.newData.avatar,
        displayName: req.body.newData.displayName,
        realName: req.body.newData.realName,
        email: req.body.newData.email,
        phone: req.body.newData.phone,
        birthday: req.body.newData.birthday,
        bio: req.body.newData.bio,
        location: req.body.newData.location,
        clubs: req.body.newData.clubs
    });

    console.log(`個人資料更新結果: ${result}`);

    res.json({ message: "/account/profile/new" });
})

// 更新隱私設定
router.post("/privacy/new", (req, res) => {
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