// setup routers
const express = require("express");
const router = express.Router();

// /user
router.get("/", (req, res) => {
    res.send("this is user");
});

// /user/settings
router.get("/settings", (req, res) => {
    res.json({
        message: "this is userRouters/settings"
    });
});

module.exports = router;