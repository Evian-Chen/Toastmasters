const express = require("express");
const router = express.Router();

const validator = require("../utils/validator");

router.post("/", 
    validator.isAccoutExists,
    validator.isUserValid,
    validator.setSessionInfo,
    (req, res) =>{
        console.log(req.body);  // { account: 'cdcdc', passwd: 'scdsc' }
        res.json({ message: "ok." });
    }
);

module.exports = router;