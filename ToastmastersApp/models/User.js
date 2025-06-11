const mongoose = require("mongoose");
const conn = require("./db");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    club: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'club'
    }],
    role: {
        type: String, 
        default: 'member'
    }
}, { 
    timestamps: true,
    collection: "user-table"
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
