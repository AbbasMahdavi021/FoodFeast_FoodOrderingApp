/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: driver.js
 * Created on: 03/23
 * Author(s): Abbas M.
 * Contact: amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: This module registers new users by checking for existing accounts, 
 *      hashing passwords, and adding user details to the database.
 * 
 */

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
const becomeDriver = (req,res) => {
    const userId = req.body.userId;

    const q = "UPDATE users SET isDriver = ? WHERE id = ?";
    db.query(q, [1, userId], (err, data) => {
        if (err) return res.json(err);
        if(data.affectedRows === 0){
            return res.send({message:  "Could not find user"})
        }
        res.send({message: "becameDriver"});
    });
}
module.exports = { register, becomeDriver };