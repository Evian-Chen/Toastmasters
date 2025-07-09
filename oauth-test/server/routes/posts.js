const express = require("express");
const model = require("../models");

const router = express.Router();

router.post("/create", (req, res) => {
    //
})

router.get("/:id", (req, res) => {
    const postId = req.params.id;
})

router.delete("/:id", (req, res) => {
    const postId = req.params.id;
})