const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
    //
    console.log(req.body);
    console.log("hihi");
    res.status(200).json({ message: "connected ok." });
})

module.exports = router;