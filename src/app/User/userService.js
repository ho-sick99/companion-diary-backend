const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const userDao = require("./userDao");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const axios = require('axios');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");

exports.SignIn = async function (token) {

    let userInfo;
    let userId;

    try {
        // access token으로 카카오 서버에 사용자 정보 요청
        userInfo = await axios({
            method:'GET',
            url:'https://kapi.kakao.com/v2/user/me',
            headers:{
                'Authorization' : 'Bearer ' + token
            }
        });

        const kakao_users_nickname = userInfo.data.properties.nickname;
        const kakao_users_profile_image = userInfo.data.properties.profile_image;
        const kakao_users_email = userInfo.data.kakao_account.email;

        // console.log(userInfo.data);
        console.log("\n------------------------ UserInfo ------------------------");
        console.log("users nickname : " + kakao_users_nickname);
        console.log("users profile image : " + kakao_users_profile_image);
        console.log("users email : " + kakao_users_email);
        console.log("----------------------------------------------------------");

        // DB user Table에서 회원 정보 가져와서 로그인(email로 확인) => 회원이 아니면 회원 가입 후 로그인
        try {
            const userIdRows = await userProvider.retrieveUserIdWithEmail(kakao_users_email);
            for (let data of userIdRows[0]) {
                userId = data.user_id;
            }
            console.log("userId : " + userId);

            // 회원가입
            if (userId == undefined) {
                await userProvider.joinUser(kakao_users_email, kakao_users_nickname, kakao_users_profile_image);
                const joinUserIdRows = await userProvider.retrieveUserIdWithEmail(kakao_users_email);
                for (let data of joinUserIdRows[0]) {
                    userId = data.user_id;
                    console.log("userId : " + userId);
                }
            }

            // 로그인 (JWT 발급 후 리턴)
            try {
                //토큰 생성 Service
                let jwtToken = await jwt.sign(
                    {
                        userId : userId,
                        userName : kakao_users_nickname,
                        userProfileImage : kakao_users_profile_image,
                        userEmail : kakao_users_email
                    }, // 토큰의 내용(payload)
                    secret_config.jwtSecret, // 비밀키
                    {
                        expiresIn: "365d",
                        subject: "userInfo",
                    } // 유효 기간 365일
                );
        
                return response(baseResponse.SUCCESS, {'jwt': jwtToken});
        
            } catch (err) {
                console.log("\n----------------------------------------------------------");
                console.log(err);
                console.log("----------------------------------------------------------");
                // logger.error(`App - postSignIn Service error\n: ${err.message} \n${JSON.stringify(err)}`);
                return errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE);
            }

        } catch(err) {
            console.log("\n----------------------------------------------------------");
            console.log(err);
            console.log("----------------------------------------------------------");

            return errResponse(baseResponse.DB_ERROR);
        }
    } catch(err) {
        console.log("\n----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.SERVER_ERROR);
    }
}

exports.editUser = async function (id, nickname) {
    try {
        console.log(id)
        const connection = await pool.getConnection(async (conn) => conn);
        const editUserResult = await userDao.updateUserInfo(connection, id, nickname)
        connection.release();

        return response(baseResponse.SUCCESS);

    } catch (err) {
        logger.error(`App - editUser Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }
}