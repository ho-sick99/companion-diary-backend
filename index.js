const express = require('./config/express');
const { logger } = require('./config/winston');
const fs = require("fs");

const http = require('http');
const https = require('https');

const HTTP_PORT = 3000;
const HTTPS_PORT = 3333;

// SSL 인증서 파일 불러오기
const options = {
    key: fs.readFileSync('./rootca.key'),
    cert: fs.readFileSync('./rootca.crt')
  };

// HTTP server 가동
http.createServer(express).listen(HTTP_PORT, () => {
    logger.info(`HTTP Server Start At Port ${HTTP_PORT}`);
});

// HTTPS server 가동
https.createServer(options, express).listen(HTTPS_PORT, () => {
    logger.info(`HTTPS Server Start At Port ${HTTPS_PORT}`);
});

// const port = 3000;

// express().listen(port, () => {
//     const dir = "./uploads"; // 업로드된 파일을 저장할 경로
//     if (!fs.existsSync(dir)) { // 해당 경로가 존재하지 않는다면
//         fs.mkdirSync(dir); // 폴더 생성
//     }
//     logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${port}`);
// });