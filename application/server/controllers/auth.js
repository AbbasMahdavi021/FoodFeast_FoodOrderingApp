const db = require("../db.js");
const bcrypt = require("bcryptjs");

const register = (req, res) => {
    //check if user already exists.
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(q, [req.body.email, req.body.name], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("User already exists!")

        //Hash Password and create user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q ="INSERT INTO users(`username`,`email`,`password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash,
        ]
        db.query(q, [values], (err,data)=>{
            if (err) return res.json(err);
            return res.status(200).json("User Created!"),
            console.log("Account for " + req.body.username + " was created!")
        });
    });
};



const login = (req, res) => {
    //Check if user exist

    const q = "SELECT * FROM users WHERE username = ?"

    db.query(q, [req.body.username], (err, data) => {
        if (err) {
            return res.json(err);
        }
        if(data.length === 0) {
            return res.status(404).json("Incorrect Username!");
        }

        //check password
        const correctPass = bcrypt.compareSync(req.body.password, data[0].password); //first item in data arr = user

        if(!correctPass) {
            return res.status(400).json("Incorrect password!");
        }

        console.log("Logged in as " + data[0].username);

        return res.status(200).send({success:true});
    });
};

module.exports = { register, login};