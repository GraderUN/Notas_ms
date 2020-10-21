const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host: 'gradernotasdb.cmn2d1zxgm1q.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: process.env.pass,
    database: 'graderNotasDb'
})

mysqlConnection.connect(function (err){
    if(err) {
        console.log(err);
        return;
    } else {
        console.log("DB connected");
    }
})

module.exports = mysqlConnection;
