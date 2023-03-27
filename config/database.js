const mysql = require('mysql2/promise');    // promise api => ws7 async await와 잘 동작함
const { logger } = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    charset: 'utf8',
    multipleStatements: true // 다중 쿼리 가능 설정
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