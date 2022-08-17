const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: 'home2.cmrjltfsmdoh.ap-northeast-2.rds.amazonaws.com',
    user: 'cgh9694',
    port: '3306',
    password: 'choi9694',
    database: 'UdemyServer'
});

module.exports = {
    pool: pool
};