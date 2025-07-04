const mongoose = require("mongoose");
const conn = require("./db");

const clubSchema = new mongoose.Schema({
    clubName: { type: String, default: "" }, // example: 'Toastmasters Club'
    role: { type: String, default: "" }, // example: 'Member'
    memberSince: { type: Date, default: Date.now },
    pathwayLevel: { type: String, default: "" }
}, {
    timestamps: true,
    _id: false // 不需要為嵌套的clubSchema生成_id
})

const userSchema = new mongoose.Schema({
    // 個人資料設定
    displayName: { type: String, default: "unknown" },
    realName: { type: String, default: "unknown"  },
    avatar: { type: String, default: "" }, // example: 'https://example.com/avatar.jpg'
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: { type: String, default: "" }, // example: '+886912345678'
    bio: { type: String, default: "" },
    location: { type: String, default: "" }, // example: 'Taipei, Taiwan'
    birthday: { type: Date, default: null }, 

    clubs: { type: [clubSchema], default: [] }, // 使用嵌套的clubSchema來儲存分會資訊

    emailToken: String,
    tokenExpires: { type: Date },
    emailVerified: { 
        type: Boolean,
        default: false
    },

    // 隱私設定
    privacy: {
        showEmail: { type: Boolean, default: false },
        showPhone: { type: Boolean, default: false },
        allowMessages: { type: Boolean, default: false },
        showBirthday: { type: Boolean, default: false },
        showOnlineStatus: { type: Boolean, default: false },
        publicProfile: { type: Boolean, default: false }
    },

    // 通知接收設定
    notifications: {
        emailNotifications: { type: Boolean, default: true },
        messageNotifications: { type: Boolean, default: false },
        postLikes: { type: Boolean, default: true },
        postComments: { type: Boolean, default: true },
        clubAnnouncements: { type: Boolean, default: true },
        systemUpdates: { type: Boolean, default: true }
    }
}, { 
    timestamps: true,
    collection: "test-user-table"
 });

const userModel = conn.model("userModel", userSchema);
module.exports = userModel;