const mysql = require("mysql2/promise");

// MySQL Connection Pool
const pool = mysql.createPool({
  host: "sql12.freesqldatabase.com",
  user: "sql12767585",
  password: "aUpAPkd5dZ",
  database: "sql12767585",
});

module.exports = pool;
