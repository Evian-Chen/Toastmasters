require('dotenv').config();
const express = require("express");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const router = express.Router();

const model = require("../models");

// 重新設定密碼
router.post("/password", async (req, res) => {
    const token = crypto.randomBytes(32).toString("hex");
    const newPassword = crypto.randomBytes(4).toString("hex");

    const email = req.body.email;

    console.log(`email: ${email}`);

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GAMIL_PW
        }
    });

    // 更新token, 設定新密碼
    const result = await model.user.updateOne(
        { email: email },
        { $set: { 
            password: newPassword,
            emailToken: token,
            tokenExpires: Date.now() + 1000 * 60 * 60 // 1 小時 
        }}
    );

    const mailOption = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: "重新設定密碼",
        html: `<p>請點擊下方連結重設密碼：</p>
        <p>這裡是您的新密碼: {{ newPassword }}，請點擊下面連結，以新密碼登入後，再重新設定密碼</p>
        <a href="http://localhost:3000/forget/password/verify?token=${token}">重設密碼連結</a>`
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

// 重設密碼驗證信請求的API
router.get("/password/verify", async (req, res) => {
    const token = req.query.token;

    console.log(`重設密碼token: ${token}`);

    // 透過token認出需要重設密碼的人
    const result = await model.user.findOne(
        { 
            emailToken: token,
            tokenExpires: { $gt: Date.now() } // 只接受未過期的 token 
        }
    );

    // 確定有找到這個人
    if (result) { 
        // 前端帶有後端產生的驗證token
        // TODO: 目前沒辦法導航到重新設定的頁面
        // 因為會有登入要求把頁面都擋下來

        // 導向一般的login，帶有reset參數
        res.redirect(`http://localhost:5173/login?reset=true$token=${token}`);
    } else {
        res.status(500).json({ message: "重設密碼驗證錯誤，找不到使用者的token" });
    }
})

// TODO: 還沒測試
// 更改密碼的時候呼叫這個API，成功的話就刪掉token
router.post("/password/new", async (req, res) => {
    const token = req.body.token;
    const result = await model.user.updateOne(
        { emailToken: token },
        { $unset: { emailToken: "", tokenExpires: "" } }
    ); 
    if (!result) {
        res.json({ message: "刪除驗證token" });
    } else {
        res.status(500).json({ message: "刪除token時錯誤" });
    }
})

module.exports = router;