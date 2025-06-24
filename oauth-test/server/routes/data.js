// 這個API用於前端單純取得data

require("dotenv").config();
const express = require("express");
const model = require("../models");

const router = express.Router();

// 回傳一個使用者的全部資訊(通常是目前的使用者)
router.get("/info", async (req, res) => {
    const email = req.query.email;  // 使用query去抓到前端傳來的params
    const result = await model.user.findOne({ 
        email: email 
    });

    if (result.length === 0) {
        return res.status(401).json({ message: "使用者不存在於資料庫" });
    }

    console.log(`find user in /data/info: ${JSON.stringify(result)}`);

    res.json({
        message: "user found",
        info: result
    });
})

module.exports = router;