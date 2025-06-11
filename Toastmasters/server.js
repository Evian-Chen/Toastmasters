require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/user.js");

const app = express();
const portNum = 8888;

// API design, endpoint (receive request from client)
app.get("/", (req, res) => {
  res.send("hi, this is node.js server");
});

// �u�n�O�q/user�i�ӡA���|�Q�ɨ�user.js�o�Ӫ���̭�
app.use("/user", userRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(portNum, () => {
      console.log(`server is running at localhost: ${portNum}`);
    });
  })
  .catch((error) => {
    console.log(`mongo connection error: ${error}`);
  });
