require("dotenv").config();

// 連線到整個 mongoDB
const mongoose = require("mongoose");

// 建立連線
const mongo_uri = process.env.MONGO_URI;
const conn = mongoose.createConnection(mongo_uri);

// 連線成功，觸發callback func
conn.on("connected", () => {
  console.log(`mongo connected: ${mongo_uri}`);
});

module.exports = conn;