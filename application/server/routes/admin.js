const express = require("express");
const {getUserList} = require("../controllers/admin.js");

const router = express.Router();

router.get("/getUserList", getUserList);


module.exports = router;