const db = require("../db.js");
const bcrypt = require("bcryptjs");
const sendMail = require('../config/sendEmail.js');



const password = async (req, res) => {

    let newPassword = Math.random() * 10000 % 1000;

    const salt = bcrypt.genSaltSync(10);
    const hashedNewPassword = bcrypt.hashSync(newPassword.toString(), salt);

    const q = "UPDATE users SET password = " + hashedNewPassword + "WHERE email = ?";

    db.query(q, [req.body.email], (err, data) => {

        //check if password is Null
        //decrypt password

        //call sendEmail function

        sendMail(req.body.email, "Password Reset", "Your password is: " + newPassword);
        console.log(newPassword);

        res.status(200).json("Email sent!");


    });
}

module.exports = {password};