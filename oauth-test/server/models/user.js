const mongoose = require("mongoose");
const conn = require("./db");

const userSchema = new mongoose.Schema({
    name: { type: String },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birthday: { type: Date },  // example: '2002-12-09'
    bio: { type: String, default: "" }
    // add custom data type，日記功能，另外定義日記的物件
}, { 
    timestamps: true,
    collection: "test-user-table"
 });

const userModel = conn.model("userModel", userSchema);
module.exports = userModel;