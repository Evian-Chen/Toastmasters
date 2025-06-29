const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const history = require("connect-history-api-fallback");
const cookieParser = require("cookie-parser");
const portNum = 3000;

const app = express();

// 跨域設定
app.use(cors({
  origin: "http://localhost:5173", // 開發中的vue預設server
  methods: ["GET", "POST"],
  credential: true
}));

app.use(express.json());

app.use(cookieParser());

// 解析urlencoded的資料型態 (前端傳來的資料)
app.use(
  bodyParser.urlencoded({
    extend: false,
    limit: "1mb",
    parameterLimit: "10000",
  })
);

// 部署後連接靜態檔案
app.use(express.static(path.join(__dirname, '../client/dist')));

// ===================== //

const authRouter = require("./routes/auth.js");
const dataRouter = require("./routes/data.js");
const forgetRouter = require("./routes/forget.js");

app.use("/auth", authRouter);
app.use("/data", dataRouter);
app.use("/forget", forgetRouter);

// ===================== //

// history 中介器
app.use(history());

app.listen(portNum, '0.0.0.0', () => {
  console.log(`running on port: ${portNum}`);
});