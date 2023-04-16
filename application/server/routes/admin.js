const express = require("express");
const {getUserList, getUser, deleteUser, deleteRestaurant, processQuery} = require("../controllers/admin.js");

const router = express.Router();

router.get("/getUserList", getUserList);

router.post("/getUser", getUser);

router.post("/deleteUser", deleteUser);

router.post("/deleteRestaurant", deleteRestaurant);

router.post("/processQuery", processQuery);


module.exports = router;