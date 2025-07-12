const express = require("express");
const model = require("../models");

const router = express.Router();

router.post("/create", (req, res) => {
    //
    res.json({ msg: '/event' });
})

router.get("/:id", (req, res) => {
    const postId = req.params.id;
    res.json({ msg: '/event' });
})

router.delete("/:id", (req, res) => {
    const postId = req.params.id;
    res.json({ msg: '/event' });
})

module.exports = router;