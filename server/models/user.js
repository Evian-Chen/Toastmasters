const mongoose = require("mongoose");
const conn = require("./db");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    picture: String
}, { 
    timestamps: true,
    collection: "user-table"
 });

const userModel = conn.model("userModel", userSchema);
module.exports = userModel;