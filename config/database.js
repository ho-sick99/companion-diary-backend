const mysql = require('mysql2/promise');    // promise api => ws7 async await와 잘 동작함
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: '13.125.223.255',
    port: 3306,
    user: 'user',
    password: 'user',
    database: 'COMPAION_DIARY_DB',
    charset : 'utf8'
});

// // TODO: 본인의 DB 계정 입력
// const pool = mysql.createPool({
//     host: '127.0.0.1',
//     port: 13307,
//     user: 'root',
//     password: 'root',
//     database: 'COMPAION_DIARY_DB',
//     charset : 'utf8'
// });

module.exports = {
    pool: pool
};