const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const diaryProvider = require("./diaryProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const axios = require('axios');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

// DB diary Table에서 일기 리스트 가져오기
exports.getDiaryList = async function (userId) {
    try {
        const getDiaryListRows = await diaryProvider.retrieveDiaryList(userId);

        return response(baseResponse.SUCCESS, getDiaryListRows[0]);

    } catch(err) {
        console.log("----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.DB_ERROR);
    }
}

// userId의 일기 생성
exports.createDiary = async function (petId, userId, content, title, img_url_1, img_url_2, img_url_3, img_url_4, img_url_5) {
    try {
        const createDiaryRows = await diaryProvider.retrieveCreateDiary(petId, userId, content, title, img_url_1, img_url_2, img_url_3, img_url_4, img_url_5);

        console.log(createDiaryRows);

        // const newDiaryId = await diaryProvider.retrieveCreateDiary();

        return response(baseResponse.SUCCESS, "true");

    } catch(err) {
        console.log("----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.DB_ERROR);
    }
}
