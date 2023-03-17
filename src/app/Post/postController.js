const postService = require("./postService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");


// GET
const output = {
    /*
    * API No. 1
    * API Name : 동물 게시글 전체 조회(질문글)
    * [GET] /posts/question/animal
    */
    getPostsQuestionAnimal: async (req, res) => {
        return res.send(await postService.getPostsList(1, 0)); // 1: question, 0: animal
    },
    /*
    * API No. 2
    * API Name : 동물 게시글 전체 조회(자랑글)
    * [GET] /posts/boast/animal
    */
    getPostsBoastAnimal: async (req, res) => {
        return res.send(await postService.getPostsList(2, 0)); // 2: boast, 0: animal
    },
    /*
    * API No. 3
    * API Name : 식물 게시글 전체 조회(질문글)
    * [GET] /posts/question/plant
    */
    getPostsQuestionPlant: async (req, res) => {
        return res.send(await postService.getPostsList(1, 1)); // 1: question, 1: plant
    },
    /*
    * API No. 4
    * API Name : 식물 게시글 전체 조회(자랑글)
    * [GET] /posts/boast/plant
    */
    getPostsBoastPlant: async (req, res) => {
        return res.send(await postService.getPostsList(2, 1)); // 2: boast, 1: plant
    },
}

/*
 * API No. 10
 * API Name : 게시물 생성(질문글)
 * [POST] /posts/question
 */
exports.postPostQuestion = async function (req, res) {
    const user_id = req.verifiedToken.userId
    const pet_id = req.body.pet_id;
    const post_title = req.body.post_title;
    const post_content = req.body.post_content;
    const post_img_url_1 = req.body.post_img_url_1;
    const post_img_url_2 = req.body.post_img_url_2;
    const post_img_url_3 = req.body.post_img_url_3;
    const post_img_url_4 = req.body.post_img_url_4;
    const post_img_url_5 = req.body.post_img_url_5;

    const result = await postService.postPostQuestion(user_id, pet_id, post_title, post_content, post_img_url_1, post_img_url_2, post_img_url_3, post_img_url_4, post_img_url_5);

    // return 값 확인
    console.log("----------- return data -------------");
    console.log(result);
    console.log("-------------------------------------");

    return res.send(result);
};

// 모듈 export
module.exports = {
    output,
    process,
};