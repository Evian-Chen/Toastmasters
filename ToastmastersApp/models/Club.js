const mongoose = require("mongoose");

const culbInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    clubId: {
        type: String,
        required: true,
        unique: true
    },
    type: String,
    meetingDate: String || "not provided",
    meetingTime: String || "not provided",
    address: String,
    addressGoogleMaps: String,
    languages: [String],
    fee: Number,
    president: String,
    phoneNumber: String,
    city: String
}, { 
    timestamps: true,
    collection: "club-table"
 });

module.exports = mongoose.model("clubInfoModel", culbInfoSchema);