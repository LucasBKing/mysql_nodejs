const util = require('util');
const mysql = require('mysql');

const pool =  mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '44223820lu4422l',
    database: 'forum_cc'
});

// ping database to check for common exception errors
pool.getConnection((err, connection) => {
    if(err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    } else if (connection) {
        console.log(`Connection established`);
        connection.release();
    }
    return;
});

// Promisify for nodejs to async/await
pool.query = util.promisify(pool.query);

module.exports = pool;