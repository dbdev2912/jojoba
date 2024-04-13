
const mysql = require('mysql');

// Create MySQL connection pool


const pool = mysql.createPool({
    connectionLimit: 10, 
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'xuandungstore'
});

// const pool = mysql.createPool({
//     connectionLimit: 10, 
//     host: 'localhost',
//     user: 'xuandung_root',
//     password: 'Qtmmt@123###',
//     database: 'xuandung_storedb'
// });



const MySQL_QUERY = async ( query ) => {
    return new Promise( (resolve) => {
        pool.query( query, (err, result, fields) => {
            if( err ){
                throw err;                
            }
            resolve(result)
        })
    })
}

module.exports = MySQL_QUERY;