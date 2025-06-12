const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");
const data = require("./testData.json");

// 取得資料庫連線
const conn = require("../ToastmastersApp/models/db");

// console.log(data);
const rawData = fs.readFileSync("./testData.json", "utf-8");
const clubs = JSON.parse(rawData);

console.log(clubs[0]);

clubs.forEach((club, index) => {
    console.log(club.name);
});
