const jwtMiddleware = require("../../../config/jwtMiddleware");
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

exports.home = async function (req, res) {
    // console.log(JSON.stringify(req));
    return res.send("루트 페이지");
}

/*
 * API No. 1
 * API Name : 카카오 Access Token으로 유저 정보 확인 API => (회원가입) => 로그인(JWT 리턴)
 * [GET] /auth/kakao/callback
 */
exports.getSignIn = async function (req, res) {
    console.log("\n----------------------------------------------------------");
    console.log(JSON.stringify(req.headers['x-access-token']));
    console.log("----------------------------------------------------------");

    let token = req.headers['x-access-token'];
    const result = await userService.SignIn(token);

    // return 값 확인
    console.log("\n----------- return data -------------");
    console.log(result);
    console.log("-------------------------------------");

    return res.send(result);
};

/*
 * API No. 2
 * API Name : JWT 토큰 검증 API
 * [GET] /app/auto-login
 */
 exports.check = async function (req, res) {
    console.log("\n---- JWT Decode 정보 출력 ----");
    console.log(JSON.stringify(req.verifiedToken));
    // const userId = req.verifiedToken.userId;
    // console.log(userId);
    console.log("------------------------------");

    return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
};

/**
 * API No. 5
 * API Name : 회원 정보 수정 API + JWT + Validation
 * [PATCH] /app/users/:userId
 * path variable : userId
 * body : nickname
 */
// exports.patchUsers = async function (req, res) {

//     // jwt - userId, path variable :userId

//     const userIdFromJWT = req.verifiedToken.userId

//     const userId = req.params.userId;
//     const nickname = req.body.nickname;

//     if (userIdFromJWT != userId) {
//         res.send(errResponse(baseResponse.USER_ID_NOT_MATCH));
//     } else {
//         if (!nickname) return res.send(errResponse(baseResponse.USER_NICKNAME_EMPTY));

//         const editUserInfo = await userService.editUser(userId, nickname)
//         return res.send(editUserInfo);
//     }
// };

// /** JWT 토큰 검증 API
//  * [GET] /app/auto-login
//  */
//  exports.check = async function (req, res) {
//     console.log("--------- JWT 토큰 검증 ----------");
//     console.log(JSON.stringify(req));

//     const userIdResult = req.verifiedToken.userId;
//     console.log(userIdResult);
//     return res.send(response(baseResponse.TOKEN_VERIFICATION_SUCCESS));
// };