const express = require("express");
const {password} = require("../controllers/sendEmail.js");

const router = express.Router();

router.post("/password", password);

module.exports = router;