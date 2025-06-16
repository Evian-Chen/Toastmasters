const mongoose = require("mongoose");
const conn = require("./db");

// 建立schema
const dramaSchema = new mongoose.Schema(
  {
    dramaId: String,
    category: String,
    name: String,
    score: Number,
  },
  {
    collection: "dramas-table",
  }
);

// 建立model(沒有該collection的話會自動建立，沒有資料的空collection的)
// 透過model和collection互動
const dramaModel = conn.model("Dramas", dramaSchema);

module.exports = dramaModel;