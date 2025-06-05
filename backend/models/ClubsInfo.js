const mongoose = require("mongoose");

const culbInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    clubNumber: {
        type: String,
        required: true,
        unique: true
    },
    city: String,
    district: String,
    address: String,
    meetingTime: String,
    fee: Number,
    languages: {
        type: String,
        enum: ["English", "Chinese", "Japanese", "Hakka", "Taiwanese"]
    },
    president: String,
    vicePresident: String
}, { timestamps: true });

module.exports = mongoose.model("clubInfoModel", culbInfoSchema);