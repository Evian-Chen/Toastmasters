const express = require("express");
const router = express.Router();
const model = require("../models");

require("dotenv").config();

const CLIENT_ID = process.env.VITE_GOOGLE_CLIENT_ID;

console.log(`backend google client id: ${VITE_GOOGLE_CLIENT_ID}`);

router.get("/", (req, res) => {
    res.json({ message: "server is on" });
});

/** Handle the POST request from onLogin callback in frontend */
router.post('/verify-token', (req, res) => {
  // use google-auth-library to verify token
  const { OAuth2Client } = require('google-auth-library')
  const client = new OAuth2Client(CLIENT_ID);

  async function verify() {
    // get credential from google
    const token = req.body.credential

    console.log('token from credential', token);

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
    })

    const payload = ticket.getPayload()

    // You can store user data in DB and return Authorization Token here.
    res.json({
      email: payload.email,
      email_verified: payload.email_verified,
      picture: payload.picture,
      name: payload.name,
    })
  }

  verify().catch(console.error);
})