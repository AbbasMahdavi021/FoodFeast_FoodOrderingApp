// this is an about page that gives some background of the developers of this app

const express = require("express");
const router = express.Router();
const { About } = require("../models");

// get all abouts
router.get("/", async (req, res) => {
    const about = await About.findAll();
    res.json(about);
});

// post a new about
router.post("/", async (req, res) => {
    const profile = req.body;
    await About.create(profile);
    res.json(profile);
});

module.exports = router;