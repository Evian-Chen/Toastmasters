/**
 * 這個檔案把 json 裡面的東西送到資料庫
 */

const fs = require("fs");
const model = require("../ToastmastersApp/models");

// console.log(data);
const rawData = fs.readFileSync("./testData.json", "utf-8");
const clubs = JSON.parse(rawData);

clubs.forEach(async (club, index) => {
    try {
        console.log(club.name);
        let res = await model.club.create({
            name: club.name, 
            clubId: club.clubId,
            type: club.type,
            meetingDate: club.meetingDate,
            meetingTime: club.meetingTime,
            address: club.address,
            addressGoogleMaps: club.addressGoogleMaps,
            languages: club.language,
            fee: club.fee,
            president: club.president,
            phoneNumber: club.phoneNumber,
            city: club.city
        });
        console.log(`result: ${res}`);
    } catch(err) {
        console.log(`error: ${err}`);
    };

});
