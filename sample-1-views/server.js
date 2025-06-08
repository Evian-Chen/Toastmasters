const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");

const portNum = 8088;

const dramasRouter = require("./routes/dramas");

// 設定模板引擎 -> 讓express解析html
app.engine("html", hbs.__express);

// 設定html template位置
app.set("views", path.join(__dirname, "application", "views"));

// 設定靜態檔(*.css, *.js, *.png...)位置
app.use(express.static(path.join(__dirname, "application")));

// 解析application/json (前端傳來的資料)
app.use(bodyParser.json());

// 解析urlencoded的資料型態 (前端傳來的資料)
app.use(
  bodyParser.urlencoded({
    extend: false,
    limit: "1mb",
    parameterLimit: "10000",
  })
);

app.get("/", (req, res) => {
  res.render("index.html"); // 回傳html頁面
});

app.get("/about/us", (req, res) => {
  res.render("aboutus.html");
});

// middleware
app.get("/hello", 
  (req, res, next) => {
    console.log("middleware1");

    // 傳到下一層
    req.testName = { name: "kathy", age: 60 };

    if (req.query.name === undefined) {
      res.json({ message: "name not exist "});
    } else {
      next();
    }
  },
  (req, res, next) => {
    console.log("middleware2");

    // http://localhost:8088/hello?name=jeff
    console.log(`you are ${req.query.name}`);

    console.log(req.testName);
    next();
  },
  (req, res, next) => {
    console.log("middleware3");
    res.json({ result: req.testName });
  }
);

app.use("/dramas", dramasRouter);

app.listen(portNum, () => {
  console.log(`Server is running at localhost:${portNum}`);
});

/// 範例
app.get("/testqq", (req, res) => {
  res.render("template.html");
});

app.get("/buttonData", (req, res) => {
  res.json({ name: "Evian", message: "hihi" });
});

// 範例
