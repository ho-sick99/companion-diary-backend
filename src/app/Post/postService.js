const postProvider = require("./postProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

// 게시물 생성 (질문글)
exports.postPostQuestion = async function (user_id, pet_id, post_title, post_content, post_img_url_1, post_img_url_2, post_img_url_3, post_img_url_4, post_img_url_5) {
    try {
        // pet이 동물인지 식물인지 확인

        // 동물

        // 식물

        const result = await postProvider.retrieveDiaryList(user_id, pet_id, post_title, post_content, post_img_url_1, post_img_url_2, post_img_url_3, post_img_url_4, post_img_url_5);

        return response(baseResponse.SUCCESS, result);

    } catch(err) {
        console.log("----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.DB_ERROR);
    }
}