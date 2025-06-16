// setup routers
const express = require("express");

const router = express.Router();

// /user
router.get("/", async (req, res) => {
    try {
        // 查是否存在
        // if exist: res.json({ message: "ok", exist: true })
        // else: res.json({ message: "ok", exist: false })
    } catch(err) {
        console.log(`auth error: %{err}`);
        res.status(500).json({ messgage: "server error" });
    }
    
});

module.exports = router;