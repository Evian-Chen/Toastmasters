require('dotenv').config();
const express = require("express");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const router = express.Router();

const model = require("../models");
const googleOAuth2Client = require('../config/googleOAuth2Client');

router.post("/login", async (req, res) => {
    console.log(`data from frontend: ${JSON.stringify(req.body)}, ${req.body.email}`);
    try {
        const result = await model.user.find({
            email: req.body.email
        })

        // 沒有使用者的資料
        if (result.length === 0) {
            console.log("後端無使用者資料");
            res.status(201).json({ message: "redirect to signup" });
        } else {  // 有使用者資料，前端重新導向
            res.status(200).json({ message: "user exists" });
        }
    } catch(err) {
        console.log(`post login error: ${err}`);
        res.status(500);
    }
})

router.post("/mail/sent", (req, res) => {
    // 生成驗證token
    const token = crypto.randomBytes(32).toString("hex");
    req.body.emailToken = token;

    console.log(`user: ${process.env.GMAIL_USER}, pw: ${process.env.GAMIL_PW}`)

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

router.get("/mail/verify", (req, res) => {
    console.log("at mail/verify");
    const token = req.query.token;
    console.log(`user token: ${token}`);

    // TODO: 把東西存入mongo

    res.redirect("http://localhost:5173/verify-success");
})

module.exports = router;