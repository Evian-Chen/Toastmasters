const mongoose = require("mongoose");
const conn = require("./db.js");

const postSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // 取得mongo分配給每一筆資料的id
    userEmail: { type: String, required: true },
    caption: { type: String, default: "default caption text" },
    likeCount: { type: Number, default: 0 }
}, {
    timestamps: true,
    collection: "post-table"
});

const postModel = conn.model("postModel", postSchema);
module.exports = postModel;