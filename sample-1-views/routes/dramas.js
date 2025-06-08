const express = require("express");
const router = express.Router();
const fs = require("fs");

let readFilePromise = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(JSON.parse(err));
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

// /dramas/page -> return dramas.html
router.get("/page", (req, res) => {
  res.render("dramas.html");
});

router.get("/getDramaListData", async (req, res) => {
  // 讀取sample2.json, 透過type過濾資料，回傳給前端
  try {
    let data = await readFilePromise("models/sample2.json");
    let type = req.query.type;
    if (type === "全") {
        res.json({ result: data });
    }
    else {
      let filteredData = data.filter(ele => ele["category"] === type);
      res.json({ result: filteredData });
    }
  } catch (err) {
    res.status(500).json({ message: "server 有問題" });
  }
});

router.post("/createNewDramaData", async (req, res) => {
    try {
        let data = await readFilePromise("models/sample2.json");

        // 取得前端form data的參數值 req.body (先去設定body-parser)
        data.push(req.body);

        fs.writeFileSync("models/sample2.json", JSON.stringify(data), "utf-8");

        res.json({ message: "ok." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "server error" })
    }
});

module.exports = router;
