const express = require("express");
const { OAuth2Client } = require('google-auth-library');
const router = express.Router();
const model = require("../models");

require("dotenv").config();

const CLIENT_ID = process.env.VITE_GOOGLE_CLIENT_ID;

console.log(`backend google client id: ${CLIENT_ID}`);

router.get("/", (req, res) => {
    res.json({ message: "server is on" });
});

router.post("/logout", async (req, res) => {
  try {
    req.session.destroy();
    console.log("destroy session");
    res.json({ message: "log out ok" });
  } catch(err) {
    console.log(`back end error: ${err}`);
    res.json({ error: err });
  }
    // 只有一個cookie(id: _toastmasters_id)，直接清除session
    
})

router.get("/me", (req, res) => {
  if (req.session.user) {
    console.log(`session user: ${req.session.user}`);
    res.json(req.session.user);
  } else {
    res.json({ error: "not loggoin in" });
  }
})

/** Handle the POST request from onLogin callback in frontend */
router.post('/verify-token', async (req, res) => {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  try {
    const token = req.body.credential;
    if (!token) return res.status(400).json({ error: 'Missing credential token' });

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const userData = {
        email: payload.email,
        email_verified: payload.email_verified,
        picture: payload.picture,
        name: payload.name,
    };

    let result = await model.user.find(userData);

    if (result.length === 0) {
        // 該使用者不存在(第一次登入)
        userData.hasLogined = true;
        const newUser = await model.user.create(userData)
        console.log(newUser);
    } else {
        // 使用者存在(曾經登入)
        console.log("user exists");
    }

    // 設定session
    req.session.user = userData;

    // 回傳目前的使用者給前端
    return res.json({
      email: payload.email,
      email_verified: payload.email_verified,
      picture: payload.picture,
      name: payload.name,
    });
  } catch (err) {
    console.error('Verify token failed:', err);
    res.status(500).json({ error: 'Token verification failed' });
  }
});

module.exports = router;