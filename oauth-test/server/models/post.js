const mongoose = require("mongoose");
const conn = require("./db.js");

const postSchema = new mongoose.Schema({
    postId: { type: String, unique: true, required: true },
    userId: { type: String, required: true }, // 取得mongo分配給每一筆資料的id
    userEmail: { type: String, required: true },
    caption: { type: String, default: "default caption text" },
    likeCount: { type: Number, default: 0 },
    likedBy: { type: [String], default: [] }, // 儲存按讚的使用者id
    type: 'post'
}, {
    timestamps: true,
    collection: "post-table"
});

const postModel = conn.model("postModel", postSchema);
module.exports = postModel;