require('dotenv').config();
const express = require("express");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const router = express.Router();

const jwt = require('jsonwebtoken');

const model = require("../models");
const verifyToken = require("../middlewares/auth");

router.post("/login", async (req, res) => {
    console.log(`data from frontend: ${JSON.stringify(req.body)}, ${req.body.email}`);
    try {
        const result = await model.user.find({
            email: req.body.email
        })

        // 沒有使用者的資料
        // if (result.length === 0 || !result[0].emailVerified) {
        //     console.log("後端無使用者資料");
        //     res.status(201).json({ message: "redirect to signup" });
        // } else {  // 有使用者資料，前端重新導向
        //     res.status(200).json({ message: "user exists" });
        // }
        if (result.length === 0 || !result[0].emailVerified) {
            return res.status(201).json({ message: "redirect to signup" });
        }

        // 檢查拿到的使用者資料和目前的使用者登入密碼一樣
        if (result[0].password !== req.body.password) {
            return res.status(401).json({ message: "password incorrect" });
        }

        // 建立 JWT payload
        const payload = req.body;
        console.log("payload" + payload);

        // 簽發 token（可設定過期時間）
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        // 將 token 放在 HttpOnly cookie（安全性較高）
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,  // 部署後改成true
            sameSite: 'Lax',
            maxAge: 24 * 60 * 60 * 1000 // 7 天
        });

        return res.status(200).json({ message: "login success", user: payload });

    } catch(err) {
        console.log(`post login error: ${err}`);
        res.status(500);
    }
})

router.post("/mail/sent", async (req, res) => {
    // 生成驗證token
    const token = crypto.randomBytes(32).toString("hex");
    req.body.emailToken = token;
    req.body.emailVerified = false;

    // 先把使用者存到資料庫
    const result = await model.user.create(req.body);
    console.log(`create user: ${JSON.stringify(result)}`);

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GAMIL_PW
        }
    });

    const mailOption = {
        from: process.env.GMAIL_USER,
        to: req.body.email,
        subject: "驗證信測試",
         html: `<p>請點擊下方連結驗證：</p>
         <a href="http://localhost:3000/auth/mail/verify?token=${req.body.emailToken}">驗證連結</a>`
    };

    transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log(`error sending email: ${err}`);
            res.status(500).json({ message: "error sending email" });
        } else {
            console.log(`email sent, info: ${info}`);
            res.json({ message: "email sent" });
        }
    });
})

router.get("/mail/verify", async (req, res) => {
  console.log("at mail/verify");
  const token = req.query.token;
  console.log(`user token: ${token}`);

  try {
    console.log("ready to update");
    const result = await model.user.updateOne(
      { emailToken: token },
      { $set: { emailVerified: true } }
    );

    console.log("update result:", result);
    res.redirect("http://localhost:5173/verify-success");
  } catch (err) {
    console.error(`updateOne error: ${err}`);
    res.status(500).send("伺服器錯誤");
  }
})

router.get('/me',
    verifyToken,
    (req, res) => {
        res.json({ user: req.user });
    }
)

module.exports = router;