const express = require("express");
const router = express.Router();

const model = require("../models");

router.post("/login", async (req, res) => {
    // 加入email, password檢查機制

    console.log(`data from frontend: ${JSON.stringify(req.body)}, ${req.body.email}`);
    try {
        const result = await model.user.find({
            email: req.body.email
        })
        console.log(`findone res: ${JSON.stringify(result)}`);
        if (result.length === 0) {
            const createRes = await model.user.create(req.body);
            console.log(`createUser res: ${createRes}`);
            res.status(201).json({ message: "created a new user" });
        } else {
            res.status(200).json({ message: "user exists" });
        }
    } catch(err) {
        console.log(`post login error: ${err}`);
        res.status(500);
    }
})

module.exports = router;