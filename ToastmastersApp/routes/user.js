// setup routers
const express = require("express");
const fs = require("fs");

const router = express.Router();

// /user
router.get("/", (req, res) => {
    res.send("this is user");
});

// 使用promise讀取多個檔案
let readFilePromise = (datapath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(datapath, "utf-8", (err, data) => {
            if (err) {
                console.log(`error: ${err}`);
                reject(JSON.parse(err));
            } else {
                resolve(JSON.parse(data));
            }
        });
    })
};

// /user/me
router.get("/me", async (req, res) => {
    // Promise.all([
    //     readFilePromise("data.json"),
    //     readFilePromise("cityDistrict.json")
    // ])
    // .then(result => {
    //     res.json(result);
    // })
    // .catch(err => {
    //     res.json(err);
    // })

    try {
        let results = {};
        results["data1"] = await readFilePromise("cityDistrict.json");
        results["data2"] = await readFilePromise("data.json");
        res.json(results);
    } catch (err) {
        res.json(err);
    }
});


module.exports = router;