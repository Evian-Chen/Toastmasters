// setup routers
const express = require("express");
const router = express.Router();

// /user
router.get("/", (req, res) => {
    res.send("this is user");
});

// /user/me
router.get("/me", (req, res) => {
    res.json({
        message: "this is user/me"
    });
});

module.exports = router;