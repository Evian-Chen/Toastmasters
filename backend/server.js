const express = require("express");
const userRouter = require("./routes/user.js");

const app = express();
const portNum = 8888;

// API design, endpoint (receive request from client)
app.get("/", (req, res) => {
    res.send("hi, this is node.js server");
});

// 只要是從/user進來，都會被導到user.js這個物件裡面
app.use("/user", userRouter);

app.listen(portNum, () => {
    console.log(`server is running at localhost: ${portNum}`);
});