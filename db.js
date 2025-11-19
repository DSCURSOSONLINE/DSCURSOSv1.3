const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost", // em Docker use DB_HOST=db
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "plataforma_ti",
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
