const mysql = require("mysql2");
require("dotenv").config();
// Database connection
const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected...");
});

module.exports = db;
