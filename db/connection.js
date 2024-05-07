const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root", 
  database: "employees",
  port: 5432, // Default PostgreSQL 
});

module.exports = pool;