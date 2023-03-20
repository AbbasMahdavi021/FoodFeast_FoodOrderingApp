const express = require("express");
const { register } = require("../controllers/auth.js");

const router = express.Router();

router.post("/register", register);
console.log("HAHAHHA")
//router.post("/login", login);
//router.post("/logout", logout);

module.exports = router;
