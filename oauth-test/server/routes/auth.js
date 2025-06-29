require('dotenv').config();
const express = require("express");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const router = express.Router();

const jwt = require('jsonwebtoken');

const model = require("../models");
const verifyToken = require("../middlewares/auth");

// 登入並使用JWT紀錄登入狀況
router.post("/login", async (req, res) => {
    console.log(`data from frontend: ${JSON.stringify(req.body)}, ${req.body.email}`);
    try {
        const result = await model.user.find({
            email: req.body.email
        })

        console.log(`login res: ${JSON.stringify(result)}`);

        // 沒有使用者的資料
        if (result.length === 0) {
            return res.status(201).json({ message: "使用者不存在" });
        } 

        // 使用者信箱未驗證
        if (!result[0].emailVerified) {
            return res.status(210).json({ message: "信箱未驗證" });
        }

        // 檢查拿到的使用者資料和目前的使用者登入密碼一樣
        if (result[0].password !== req.body.password) {
            return res.status(401).json({ message: "password incorrect" });
        }

        // TODO: 要先確認如果bio(或者email/pw除外的資料)有被更改的時候
        // 下次登入必須還是有資料

        // 建立 JWT payload
        const payload = req.body;
        console.log("payload" + JSON.stringify(payload));

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

router.post("/logout", (req, res) => {
    console.log("try to logout");
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: false, // 若部署後改成true
            sameSite: 'Lax'
        });
        res.json({ message: "logout ok." });
    } catch(err) {
        res.status(500).json({ message: "logout error" });   
    }
})

// 寄出email驗證信
router.post("/mail/sent", async (req, res) => {
    // 生成驗證token
    const token = crypto.randomBytes(32).toString("hex");
    req.body.emailToken = token;
    req.body.emailVerified = false;

    const findResult = await model.user.find({
        email: req.body.email
    });
    if (findResult.length !== 0) {
        console.log("註冊者已經存在");
        return res.status(201).json({ message: "註冊的使用者資料已經存在" });
    }

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

    if (import.meta.env.VITE_API_BASE_URL === '/api') {
        const html = `<p>請點擊下方連結驗證：</p>
         <a href="http://localhost:3000/auth/mail/verify?token=${req.body.emailToken}">驗證連結</a>`
    } else {
        const html = `<p>請點擊下方連結驗證：</p>
         <a href="https://toastmasters.onrender.com/auth/mail/verify?token=${req.body.emailToken}">驗證連結</a>`
    }

    const mailOption = {
        from: process.env.GMAIL_USER,
        to: req.body.email,
        subject: "驗證信測試",
         html: html
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

// 確認這個使用者的email是可以使用的，並且重新導向
router.get("/mail/verify", async (req, res) => {
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

router.get("/check", (req, res) => {
    const cookieToken = req.cookies.token;
    console.log(`cookie: ${JSON.stringify(cookieToken)}`);
    if (cookieToken) {
        console.log("cookie exist, retunr success");
        res.json({ status: "success" });
    } else {
        res.json({ status: "failed" });
    }
})

// 透過這個api檢查是否有使用者的登入
router.get('/me',
    verifyToken,
    async (req, res) => {
        const result = await model.user.find({
            email: req.user.email
        });
        // console.log(`get /me result: ${JSON.stringify(result[0])}`);
        const user = result[0];

        // console.log(`get /me result: ${JSON.stringify(user)}`);

        res.json({
            message: "/me ok.",
            user: {
                name: user.name,
                email: user.email,
                emailVerified: user.emailVerified,
                bio: user.bio
            }
        });
    }
)

module.exports = router;