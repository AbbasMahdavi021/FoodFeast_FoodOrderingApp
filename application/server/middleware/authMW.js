/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: authMW.js
 * Created on: 03/23
 * Author(s): Abbas M.
 * Contact: amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: Authorization middlware for requiring authorized users
 * 
 */

module.exports = function adminMW(req, res, next) {

    if (req.session.isAdmin) {
        next();
    } else {
        console.log("Unauthorized User!");
        res.status(401).send("Unauthorized User!");
    }
}