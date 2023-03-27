const secret_config = require("../../../config/secret");
const authProvider = require("./authProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

const axios = require('axios');
const jwt = require("jsonwebtoken");

exports.signIn = async function (token) {
    let userInfo;
    let user_id;

    try {
        // access token으로 카카오 서버에 사용자 정보 요청
        userInfo = await axios({
            method: 'GET',
            url: 'https://kapi.kakao.com/v2/user/me',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        console.log(userInfo)
        const user_email = userInfo.data.kakao_account.email;
        const user_nickname = userInfo.data.properties.nickname;
        const user_profile_img = userInfo.data.properties.profile_image;

        // console.log(userInfo.data);
        console.log("\n------------------------ UserInfo ------------------------");
        console.log("user_email : " + user_email);
        console.log("user_nickname : " + user_nickname);
        console.log("user_profile_img : " + user_profile_img);
        console.log("----------------------------------------------------------");

        // DB user Table에서 회원 정보 가져와서 로그인(email로 확인) => 회원이 아니면 회원 가입 후 로그인
        try {
            const userIdRows = await authProvider.retrieveUserIdWithEmail(user_email);
            for (let data of userIdRows) {
                user_id = data.user_id;
            }
            console.log("user_id : " + user_id);

            // 회원가입
            if (user_id == undefined) {
                // DB에 회원정보 추가
                await authProvider.joinUser(user_email, user_nickname, user_profile_img);

                const joinUserIdRows = await authProvider.retrieveUserIdWithEmail(user_email);

                for (let data of joinUserIdRows) {
                    user_id = data.user_id;
                    console.log("user_id : " + user_id);
                }

                // 회원의 animal Aother, plant Aother 추가
                await authProvider.addOtherPet(user_id);
            }

            // 로그인 (JWT 발급 후 리턴)
            try {
                //토큰 생성 Service
                const jwtToken = jwt.sign(
                    {
                        userId: user_id,
                        userEmail: user_email,
                        userNicname: user_nickname,
                        userProfileImage: user_profile_img
                    }, // 토큰의 내용(payload)
                    process.env.JWT_SECRET_KEY, // 비밀키
                    {
                        expiresIn: "365d",
                        subject: "userInfo",
                    } // 유효 기간 365일
                );
                console.log(jwtToken)
                return response(baseResponse.SUCCESS, { 'x-access-token': jwtToken });

            } catch (err) {
                console.log("\n----------------------------------------------------------");
                console.log(err);
                console.log("----------------------------------------------------------");

                return errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE);
            }

        } catch (err) {
            console.log("\n----------------------------------------------------------");
            console.log(err);
            console.log("----------------------------------------------------------");

            return errResponse(baseResponse.DB_ERROR);
        }
    } catch (err) {
        console.log("\n----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.SERVER_ERROR);
    }
};