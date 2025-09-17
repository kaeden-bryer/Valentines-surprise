import mysql from 'mysql2';

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'Moondarling',
    database: 'valentines_surprise'
}).promise();

const result = pool.query("SELECT * FROM memories")
console.log(result);