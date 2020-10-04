const mysql = require('mysql')
export const url = process.env.url

const mysqlConnection = mysql.createConnection({
    host: 'gradernotasdb.crp3hkghifbm.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: url,
    database: 'graderNotasDB'
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