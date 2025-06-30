require("dotenv").config();
const express = require("express");
const model = require("../models");

const router = express.Router();

router.post("/me/password", (req, res) => {
    //
    res.json({ message: "/account/me/password" });
})

module.exports = router;