// 引入套件
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const session = require("express-session");

const portNum = 8888;

// ===================== //
// 基本設定

// 設定模板引擎 -> 讓express解析html
app.engine("html", hbs.__express);

// 設定html template位置
app.set("views", path.join(__dirname, "application", "views"));

// 設定靜態檔(*.css, *.js, *.png...)位置
app.use(express.static(path.join(__dirname, "application")));

// 解析application/json (前端傳來的資料)
app.use(bodyParser.json());

app.use(session({
  secret: "c90dis90",  // session加密
  resave: true,        // 儲存到store上面
  saveUninitialized: false, // 初始化的session是否要存到store
  name: "_ntust_tutorial_id", // cokkie的key
  ttl: 20*60*60*1  // session的有效時間
}));

// 解析urlencoded的資料型態 (前端傳來的資料)
app.use(
  bodyParser.urlencoded({
    extend: false,
    limit: "1mb",
    parameterLimit: "10000",
  })
);

// ===================== //

// const userRouter = require("./routes/user.js");

app.get("/", (req, res) => {
  res.render("index.html");
});

// app.use("/user", userRouter);

app.listen(portNum,() => {
  console.log(`running on port: ${portNum}`);
});