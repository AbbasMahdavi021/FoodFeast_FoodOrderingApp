const express = require("express");
const {getUserList, deleteUser} = require("../controllers/admin.js");

const router = express.Router();

router.get("/getUserList", getUserList);

router.post("/deleteUser", deleteUser);


module.exports = router;