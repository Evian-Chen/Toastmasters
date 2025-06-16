// 連線到整個 mongoDB
const mongoose = require("mongoose");

// 建立連線
const connConfig =
  "mongodb+srv://EvianChen:921208kk@toastmastersapp.cxdjq5u.mongodb.net/";
const conn = mongoose.createConnection(connConfig);

// 連線成功，觸發callback func
conn.on("connected", () => {
  console.log("mongo connected");
});

module.exports = conn;