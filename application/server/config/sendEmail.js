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
        else console.log(info)
    })

}

module.exports = sendMail;