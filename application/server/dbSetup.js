// const mysql = require('mysql2');
// const { db } = require("./connect.js");
// require("dotenv").config();

// //Run this script to initialize the database

// const con = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
// });

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE IF NOT EXISTS SFSUFF", function (err, result) {
//         if (err) throw err;
//         console.log("Database created");
//     });

//     con.end();
// });


// db.getConnection((err, connection) => {

//     if (err) throw err;
//     console.log("Connected as ID: " + connection.threadId);

//     sql = "DROP TABLE IF EXISTS `users`";

//     connection.query(sql, (err, rows) => {
//         if (err) throw err;
//         sql =
//             "CREATE TABLE IF NOT EXISTS `users` (" +
//             "`id` int NOT NULL AUTO_INCREMENT," +
//             "`username` varchar(128) NOT NULL," +
//             "`email` varchar(255) NOT NULL, " +
//             "`password` varchar(255) NOT NULL," +
//             "PRIMARY KEY (`id`)," +
//             "UNIQUE KEY `id_UNIQUE` (`id`)," +
//             "UNIQUE KEY `username_UNIQUE` (`username`)," +
//             "UNIQUE KEY `email_UNIQUE` (`email`)" +
//             ")";

//         connection.query(sql, (err, rows) => {
//             if (err) throw err;

//         });

//     });

//     connection.release(); //Return the connection to the pool
//     if (err) throw err;

// });