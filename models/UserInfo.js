const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
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
}, { timestamps: true });

module.exports = mongoose.model("UserInfoModel", userInfoSchema);