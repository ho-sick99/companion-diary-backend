const mysql = require('mysql2/promise');    // promise api => ws7 async await와 잘 동작함
const { logger } = require('./winston');
const tunnel = require('tunnel-ssh');

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

// ssh 터널링을 통한 서버 db 접속 테스트
// const ssh_config = {
//     username: process.env.SSH_USER,
//     password: process.env.SSH_PASSWORD,
//     host: process.env.SSH_HOST,
//     port: process.env.SSH_PORT,
//     dstHost: process.env.SSH_DATABASE_HOST,
//     dstPort: process.env.SSH_DATABASE_PORT,
// };

// const sshOptions = {
// 	host: process.env.SSH_HOST,
// 	port: 22,
// 	username: process.env.SSH_USER,
// 	password: process.env.SSH_PASSWORD
// };

// function mySimpleTunnel(sshOptions, port, autoClose = true){
//     let forwardOptions = {
//         srcAddr:'127.0.0.1',
//         srcPort:port,
//         dstAddr:'127.0.0.1',
//         dstPort:port
//     }

//     let tunnelOptions = {
//         autoClose:autoClose
//     }
    
//     let serverOptions = {
//         port: port
//     }

//     return tunnel.createTunnel(tunnelOptions, serverOptions, sshOptions, autoClose);
// }

module.exports = {
    pool: pool
};