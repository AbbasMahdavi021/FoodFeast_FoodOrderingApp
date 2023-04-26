const db = require("../db.js");
const bcrypt = require("bcryptjs");

const register = (req, res) => {
    //check if user already exists.
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("User already exists!")

        //Hash Password and create user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`username`, `email`, `password`,`isDriver`) VALUES (?)"
        const values = [  req.body.username,  req.body.email,  hash, 1]
        
        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User Created!"),
                console.log("Account for " + req.body.username + " was created!")
        });
    });
};

module.exports = { register };