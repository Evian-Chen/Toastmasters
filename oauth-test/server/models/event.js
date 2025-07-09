const mongoose = require("mongoose");
const conn = require("./db");

const eventSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // 取得mongo分配給每一筆資料的id
    userEmail: { type: String, required: true },
    title: { type: String, defult: "title" },
    caption: { type: String, defult: "caption" },
    registerLink: { type: String, defult: "title" },
    coverImageFile: { type: String, default: "" } // example: 'https://example.com/avatar.jpg'
}, {
    timestamps: true,
    collection: "event-table"
});

const eventModel = conn.model("eventModel", eventSchema);
module.exports = eventModel;