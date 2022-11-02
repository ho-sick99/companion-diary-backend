const postService = require("../../app/User/postService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/*
 * API No. 10
 * API Name : 게시물 생성(질문글)
 * [POST] /posts/question
 */
exports.postPostQuestion = async function (req, res) {
    const user_id = req.verifiedToken.userId
    const user_email = req.verifiedToken.userEmail;
    const user_nickname = req.verifiedToken.userNicname;
    const user_profile_img = req.verifiedToken.userProfileImage;

    let ob = {user_email : user_email, user_nickname : user_nickname, user_profile_img : user_profile_img};

    // return 값 확인
    console.log("\n----------- return data -------------");
    console.log(response(baseResponse.SUCCESS, ob));
    console.log("-------------------------------------");

    return res.send(response(baseResponse.SUCCESS, ob));
};