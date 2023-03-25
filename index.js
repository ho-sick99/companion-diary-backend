const express = require('./config/express');
const { logger } = require('./config/winston');
const fs = require("fs");
const dotenv = require("dotenv"); // 환경변수 라이브러리

dotenv.config(); // 환경변수 사용

const HTTPS_PORT = process.env.SECURE_SERVER_PORT;

express().listen(HTTPS_PORT, () => {
    const dir = "./uploads"; // 업로드된 파일을 저장할 경로
    if (!fs.existsSync(dir)) { // 해당 경로가 존재하지 않는다면
        fs.mkdirSync(dir); // 폴더 생성
    }
    logger.info(`${process.env.NODE_ENV} - API Server Start At Port ${HTTPS_PORT}`);
});