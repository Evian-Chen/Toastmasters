const express = require("express");

const router = express.Router();

router.get("/page", (req, res) => {
    res.render("club.html");
});

module.exports = router;