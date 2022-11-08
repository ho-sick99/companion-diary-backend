const mysql = require('mysql2/promise');    // promise api => ws7 async await와 잘 동작함
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: '3.38.100.128',
    port: 13306,
    user: 'user',
    password: 'user',
    database: 'COMPAION_DIARY_DB',
    charset : 'utf8'
});

module.exports = {
    pool: pool
};