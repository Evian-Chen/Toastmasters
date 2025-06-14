const express = require("express");
const router = express.Router();
const fs = require("fs");

const validator = require("../utils/validator");

const model = require("../models"); // require 資料夾的話，預設回傳 index.js

// /dramas/page -> return dramas.html
router.get("/page", (req, res) => {
  res.render("dramas.html");
});

// 取得影集資料
router.get("/list", async (req, res) => {
  try {
    let type = req.query.type === "全" ? {} : { category: req.query.type };
    let data = await model.dramas.find(type);
    res.json({ result: data });
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});

// // 新增影集資料
router.post("/detail", async (req, res) => {
  try {
    let lastEle = await model.dramas
      .findOne({}, { dramaId: 1 })
      .sort({ dramaId: -1 });
    let newDramaId = Number(lastEle["dramaId"]) + 1;
    req.body["dramaId"] = String(newDramaId);
    let ressult = await model.dramas.create(req.body);
    console.log(ressult);
    res.json({ message: "ok." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
});

// // 修改影集資料
router.put("/detail/:dramaId", async (req, res) => {
  try {
    let dramaId = req.params.dramaId;
    let result = await model.dramas.updateOne(
      { dramaId: dramaId },
      { $set: { name: req.body.name, score: req.body.score } }
    );
    res.json({ message: "ok." });
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});

// 刪除影集資料
router.delete("/detail/:dramaId", async (req, res) => {
  try {
    let dramaId = req.params.dramaId;
    let result = await model.dramas.deleteOne({ dramaId: dramaId });
    res.json({ message: "ok." });
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;

// ------ 以下是未經過資料庫操作的內容以下是未經過資料庫操作的內容 ------ //

// let readFilePromise = (path) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(path, "utf-8", (err, data) => {
//       if (err) {
//         reject(JSON.parse(err));
//       } else {
//         resolve(JSON.parse(data));
//       }
//     });
//   });
// };

// // 一定會經過的middleware
// router.use(
//   // 檢查API請求header上是否有token
//   validator.isTokenExist,
//   // 檢查token是否正確
//   validator.isTokenValid
// );

// router.get("/list",
//   // 檢查參數存在
//   (req, res, next) => {
//     if (!req.query.type) {
//       // status code 可以讓前端進入catch error的區域
//       res.status(400).json({ message: "沒有type" });
//     } else {
//       next();
//     }
//   },
//   // 檢查參數型別正確
//   (req, res, next) => {
//     let data = ["犯罪", "殭屍", "愛情", "政治", "其他", "全"];
//     if (data.indexOf(req.query.type) === -1) {
//       res.status(400).json({ message: "type不在參數列表中" });
//     } else {
//       next();
//     }
//   },
//   // 參數沒問題，存入資料
//   async (req, res) => {
//     // 讀取sample2.json, 透過type過濾資料，回傳給前端
//     try {
//       let data = await readFilePromise("models/sample2.json");
//       let type = req.query.type;
//       if (type === "全") {
//           res.json({ result: data });
//       }
//       else {
//         let filteredData = data.filter(ele => ele["category"] === type);
//         res.json({ result: filteredData });
//       }
//     } catch (err) {
//       res.status(500).json({ message: "server 有問題" });
//     }
//   }
// );

// router.post("/data",
//   async (req, res) => {
//     try {
//         let data = await readFilePromise("models/sample2.json");

//         // 新增dramaId
//         let latestDramaId = data.map(ele => ele['dramaId']).sort((a, b) => b-a)[0];

//         // 取得前端form data的參數值 req.body(物件) (先去設定body-parser)
//         req.body.dramaId = String(Number(latestDramaId) + 1);
//         data.push(req.body);

//         fs.writeFileSync("models/sample2.json", JSON.stringify(data), "utf-8");

//         res.json({ message: "ok." });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "server error" })
//     }
//   }
// );
