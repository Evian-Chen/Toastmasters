const express = require("express");
const router = express.Router();

const model = require("../models");

router.get("/cities", (req, res) => {
    const cities = [
        "台北市", "新北市", "基隆市", "桃園市", "新竹市", "新竹縣",
        "苗栗縣", "台中市", "彰化縣", "南投縣", "雲林縣", "嘉義市", "嘉義縣",
        "台南市", "高雄市", "屏東縣", "宜蘭縣", "花蓮縣", "花蓮市", "台東縣",
        "澎湖縣", "金門縣", "連江縣"
    ];

    console.log("find city");
    res.json(cities);
});

router.get("/list", async (req, res) => {
    console.log("/list searching");
    try {
        const query = {};
        if (req.query.type !== "全") { query.type = req.query.type; };
        if (req.query.city !== "全") { query.city = req.query.city; };
        if (req.query.lang !== "全") { query.languages = { $in: [req.query.lang] }; };
        
        console.log(query);

        // 搜尋資料庫
        let result = await model.club.find(query);
        console.log(`
            city: ${query.city},
            type: ${query.type},
            languages: ${query.lang}`);
        console.log(`find result: ${result.length}`);
        res.json(result);
    } catch(err) {
        console.log(`fetching error: ${err}`);
        res.status(500).json({ message: "server error" });
    }
});

module.exports = router;