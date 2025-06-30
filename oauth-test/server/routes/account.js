require("dotenv").config();
const express = require("express");
const model = require("../models");

const router = express.Router();

// 更新密碼
router.post("/password/new", (req, res) => {
    //
    res.json({ message: "/account/password/new" });
})

// 更新個人資料
router.post("/profile/new", (req, res) => {
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