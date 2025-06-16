// 引入套件
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");  // 處理vite的跨網域問題

const portNum = 3000;

// ===================== //
// 基本設定

app.use(cors({
  origin: "http://localhost:5173", // 開發中的vue預設server
  methods: ["GET", "POST"],
  credential: true
}));

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

const clubRouter = require("./routes/club.js");
// const authRouter = require("./routes/auth.js");

// app.get("/", (req, res) => {
//   res.render("index.html");
// });

app.use("/club", clubRouter);
// app.use("/auth", authRouter);

// // app.use("/user", userRouter);

// ===================== //


app.listen(portNum,() => {
  console.log(`running on port: ${portNum}`);
});