const express = require("express");
const { register, login, logout, getStatus} = require("../controllers/auth.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getStatus", getStatus);

module.exports = router;
