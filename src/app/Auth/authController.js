const authService = require("./authService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/*
 * API No. 1
 * API Name : 카카오 소셜 로그인/회원가입
 * [GET] /auth/kakao/callback
 */
exports.getSignIn = async function (req, res) {
    // console.log("\n----------------------------------------------------------");
    // console.log(JSON.stringify(req.headers['x-access-token']));
    // console.log("----------------------------------------------------------");

    let token = req.headers['x-access-token'];

    const result = await authService.signIn(token);

    // return 값 확인
    console.log("\n----------- return data -------------");
    console.log(result);
    console.log("-------------------------------------");

    return res.send(result);
};

/*
 * API No. 2
 * API Name : 자동 로그인
 * [GET] /auth/jwt
 */
 exports.jwtCheck = async function (req, res) {
    // console.log("\n---- JWT Decode 정보 출력 ----");
    // const user_id = req.verifiedToken.userId;
    // const user_email = req.verifiedToken.userEmail;
    // const user_nickname = req.verifiedToken.userNicname;
    // const user_profile_img = req.verifiedToken.userProfileImage;
    // console.log(user_id);
    // console.log(user_email);
    // console.log(user_nickname);
    // console.log(user_profile_img);
    // console.log("------------------------------");

    // return 값 확인
    console.log("\n----------- return data -------------");
    console.log(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
    console.log("-------------------------------------");

    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};