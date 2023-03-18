const postProvider = require("./postProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

// 게시글 list 조회
exports.getPostsList = async (post_type, pet_tag) => {
    try {
        // 댓글 개수 반환 메서드 추가해야함
        const result = await postProvider.retrievePostList(post_type, pet_tag); // 게시글 타입, 동식물 태그
        return response(baseResponse.SUCCESS, result);
    } catch (err) {
        console.log("----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.DB_ERROR);
    }
}

// 게시물 조회
exports.getPost = async (post_type, post_id) => {
    try {
        // 댓글 메서드 추가해야함
        const result = await postProvider.getPost(post_type, Number(post_id)); // post_id 숫자형으로 변환 
        return response(baseResponse.SUCCESS, result[0]);
    } catch (err) {
        console.log("----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.DB_ERROR);
    }
}


// 게시물 생성 (질문글)
exports.postPostQuestion = async function (user_id, pet_id, post_title, post_content) {
    try {
        const post_type = "QUESTION";
        const result = await postProvider.createPost(user_id, pet_id, post_type, post_title, post_content);

        return response(baseResponse.SUCCESS, result);

    } catch (err) {
        console.log("----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.DB_ERROR);
    }
}