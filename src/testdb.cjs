let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Moondarling",
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});