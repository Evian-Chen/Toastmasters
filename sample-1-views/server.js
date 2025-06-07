const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const portNum = 8088;

const dramasRouter = require("./routes/dramas");

// 設定模板引擎 -> 讓express解析html
app.engine("html", hbs.__express);

// 設定html template位置
app.set("views", path.join(__dirname, "application", "views"));

// 設定靜態檔(*.css, *.js, *.png...)位置
app.use(express.static(path.join(__dirname, "application")));

app.get("/" , (req,res) => {
  res.render("index.html");  // 回傳html頁面
});

app.get("/about/us", (req, res) => {
  res.render("aboutus.html");
})

app.use("/dramas", dramasRouter);

app.listen(portNum , ()=>{
  console.log(`Server is running at localhost:${portNum}`);
});






/// 範例
app.get("/testqq", (req, res) => {
  res.render("template.html");
});

app.get("/buttonData", (req, res) => {
  res.json({ name: "Evian", message: "hihi" });
})

// 範例
