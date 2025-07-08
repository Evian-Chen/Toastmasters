// 這個API用於前端單純取得data

require("dotenv").config();
const express = require("express");
const model = require("../models");

const router = express.Router();

// 回傳目前使用者的資料給pinia(少量資料)，使用email做查詢
router.get("/info", async (req, res) => {
    const email = req.query.email;  // 使用query去抓到前端傳來的params
    const result = await model.user.findOne({ 
        email: email 
    });

    if (!result || result.length === 0) {
        return res.status(404).json({ message: "使用者不存在於資料庫" });
    }

    res.json({ message: "user found", info: result });
})

router.get("/fullInfo", async (req, res) => {
    try {
        const result = await model.user.findOne({
            email: req.query.email
        });
        console.log(`find ${req.query.email}: ${JSON.stringify(result)}`);
        res.json({ msg: "ok", result: result });  
    } catch(err) {
        console.log(`fullInfo err: ${err}`);
    }
    
})

module.exports = router;