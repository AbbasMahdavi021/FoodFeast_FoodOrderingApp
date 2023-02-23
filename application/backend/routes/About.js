// this is an about page that gives some background of the developers of this app

const express = require("express");
const router = express.Router();
const { About } = require("../models");

// get all abouts
router.get("/", async (req, res) => {
    const about = await About.findAll();
    res.json(about);
});

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await About.findByPk(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: `User with id ${userId} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving user data' });
  }
});

// post a new about
router.post("/", async (req, res) => {
    const profile = req.body;
    await About.create(profile);
    res.json(profile);
});

module.exports = router;