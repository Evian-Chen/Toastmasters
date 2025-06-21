const express = require("express");
const router = express.Router();

const model = require("../models");
const googleOAuth2Client = require('../config/googleOAuth2Client');

router.post("/login", async (req, res) => {
    console.log(`data from frontend: ${JSON.stringify(req.body)}, ${req.body.email}`);
    try {
        const result = await model.user.find({
            email: req.body.email
        })

        // 沒有使用者的資料
        if (result.length === 0) {
            console.log("後端無使用者資料");
            res.status(201).json({ message: "redirect to signup" });
        } else {  // 有使用者資料，前端重新導向
            res.status(200).json({ message: "user exists" });
        }
    } catch(err) {
        console.log(`post login error: ${err}`);
        res.status(500);
    }
})

router.post("/mail/verify", (req, res) => {
    console.log("email verify");
    res.json({ message: "api ok" });
})

module.exports = router;