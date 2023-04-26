const express = require("express");
const { register, login, logout, getStatus, adminlogin, restaurantOwnerRegister} = require("../controllers/auth.js");

const router = express.Router();

router.post("/register", register);
router.post("/restaurantOwnerRegister", restaurantOwnerRegister);
router.post("/login", login);
router.post("/logout", logout);
router.post("/adminlogin", adminlogin);
router.get("/getStatus", getStatus);

module.exports = router;
