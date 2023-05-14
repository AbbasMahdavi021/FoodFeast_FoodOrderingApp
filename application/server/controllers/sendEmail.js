/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: sendEmail.js
 * Created on: 03/23
 * Author(s): Abbas M.
 * Contact: amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: This module generates a random new password for a user, hashes it, 
 *      updates the user's password in the database, and sends an email to the user 
 *      with the new password.
 * 
 */

const db = require("../db.js");
const bcrypt = require("bcryptjs");
const sendMail = require('../config/sendEmail.js');
const randomWords = require('random-words');


const password = async (req, res) => {

    const generatePassword = () => {
        const words = randomWords({ exactly: 2 }).map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        });
        const randomNumbers = Math.floor(Math.random() * 90 + 10);
        return words.join('') + randomNumbers;
    };


    const newPassword = generatePassword();

    const salt = bcrypt.genSaltSync(10);
    const hashedNewPassword = bcrypt.hashSync(newPassword, salt);

    const q = `UPDATE users SET password = '${hashedNewPassword}' WHERE email = ?`;

    db.query(q, [req.body.email], (err, data) => {

        //check if password is Null
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to update password" });
        }
        
        //decrypt password

        //call sendEmail function

        const email = req.body.email;
        const username = email.substring(0, email.indexOf("@"));

        const emailBody =
            `Dear ${username},

            We recently received a request to reset the password for your account at SFSU-FoodFeast. Your new password has been generated and is ready to use.
            
            Your new password is: ${newPassword}
            
            For security reasons, we recommend that you change your password as soon as possible after logging in. If you did not request a password reset, please contact our support team immediately.
            
            Thank you for using SFSU-FoodFeast!
            
            Best regards,
            SFSU-FF Admin`
            ;


        sendMail(email, "Your New Password", emailBody);

        res.status(200).json("Email sent!");

    });
}

module.exports = { password };