const mongoose = require("mongoose");
const conn = require("./db");

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
    meetingDate: String,
    meetingTime: String,
    address: String,
    addressGoogleMaps: String,
    languages: [String],
    fee: String,
    president: String,
    phoneNumber: String,
    city: String
}, { 
    timestamps: true,
    collection: "club-table"
 });

const clubModel = conn.model("clubModel", culbInfoSchema);
module.exports = clubModel;