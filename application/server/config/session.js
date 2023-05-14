/**
 * Project Title: FoodFeast - Full Stack Web Application
 * 
 * Filename: Admin.jsx
 * Created on: 04/23
 * Author(s): Abbas M.
 * Contact: amahdavi2@sfsu.edu
 * Copyright (c) 2023 by San Francisco State University
 * 
 * Description: Session creation...
 */

const session = require('express-session');

module.exports = app => {
    app.use(session({
        name: 'SFSUFF',
        secret: 'secret',
        resave: 'false',
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60  //1hr (Mult by 2 for 2hr)
        }
    }))
};