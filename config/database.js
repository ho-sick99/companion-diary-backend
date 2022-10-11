const mysql = require('mysql2/promise');    // promise api => ws7 async await와 잘 동작함
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: 'localhost',
    user: 'user',
    port: 13306,
    password: 'user',
    database: 'COMPAION_DIARY_DB'
});

module.exports = {
    pool: pool
};