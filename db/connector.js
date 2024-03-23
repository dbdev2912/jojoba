
const mysql = require('mysql');

// Create MySQL connection pool


const pool = mysql.createPool({
    connectionLimit: 10, 
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'xuandungstore'
});

module.exports = pool;