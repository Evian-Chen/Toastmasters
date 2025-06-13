const express = require("express");

const router = express.Router();

router.get("/page", (req, res) => {
    res.render("club.html");
});

router.get("/cities", (req, res) => {
    cities = [
        "台北市", "臺北市", "新北市", "基隆市", "桃園市", "新竹市", "新竹縣",
        "苗栗縣", "台中市", "彰化縣", "南投縣", "雲林縣", "嘉義市", "嘉義縣",
        "台南市", "高雄市", "屏東縣", "宜蘭縣", "花蓮縣", "花蓮市", "台東縣",
        "澎湖縣", "金門縣", "連江縣"
    ];

    res.json(cities);
});

module.exports = router;