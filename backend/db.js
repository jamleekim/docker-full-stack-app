const mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit : 10,
    host: 'mysql',
    user: 'root',
    password: 'dnaksehd0793',
    database: 'myapp'
})

// aws rds 서비스의 mysql 정보에 맞게 변경해야한다.

exports.pool = pool;