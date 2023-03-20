const mySQL = require("mysql2");
require("dotenv").config();


let db = mySQL.createConnection({
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
})

module.exports = db ;