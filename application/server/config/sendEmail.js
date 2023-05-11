/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: Admin.jsx
 * Created on: 04/23
 * Author(s): Abbas M.
 * Contact: amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: Email sending functions for resetting passwords.
 */


const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

 const sendMail = (to, subject, message) =>{
    const transporter = nodemailer.createTransport({
        service : process.env.EMAIL_SERVICE,
        secure: false,
        auth : {
            user : process.env.EMAIL_USERNAME,
            pass : process.env.EMAIL_PASSWORD
        },
        tls : {
            rejectUnauthorized: false
        }
    })

    const options = {
        from : process.env.EMAIL_SENDER, 
        to, 
        subject, 
        text: message,
    }

    transporter.sendMail(options, (error, info) =>{
        if(error) console.log(error)
    })

}

module.exports = sendMail;