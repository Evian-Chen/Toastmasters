const express = require("express");
const router = express.Router();

const model = require("../models");

router.post("/login", async (req, res) => {
    // 加入email, password檢查機制

    console.log(`data from frontend: ${JSON.stringify(req.body)}, ${req.body.email}`);
    try {
        const result = await model.user.find({
            email: req.body.email
        })

        // 沒有使用者的資料，前端導向signup註冊頁面
        if (result.length === 0) {
            console.log("無使用者資料，需導向註冊頁面");
            res.status(201).json({ message: "redirect to signup" });
        } else {  // 有使用者資料，前端重新導向
            res.status(200).json({ message: "user exists" });
        }
    } catch(err) {
        console.log(`post login error: ${err}`);
        res.status(500);
    }
})

module.exports = router;