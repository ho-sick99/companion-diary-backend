const postService = require("./postService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const fs = require("fs");

// GET
const output = {
    /*
    * API No. 1
    * API Name : 게시글 전체 조회 (동물/식물, 질문글/자랑글)
    * [GET] /posts/list?ptype&ptag
    */
    getPosts: async (req, res) => {
        return res.send(await postService.getPostsList(req.query.ptype, req.query.ptag));
    },
    /*
    * API No. 2
    * API Name : 게시글 조회
    * [GET] /posts/list?ptype&pid
    */
    getPost: async (req, res) => {
        return res.send(await postService.getPost(req.query.ptype, req.query.pid));
    },
}

// POST
const process = {
    /*
     * API No. 3
     * API Name : 게시물 생성(질문글)
     * [POST] /posts/question
     */
    postPostQuestion: async (req, res) => {
        const contents = postService.createContents(req.verifiedToken.userId, req.body, req.files); // 게시글 콘텐츠 생성
        contents.post_type = "QUESTION"; // 게시글 타입: 질문글

        const result = await postService.createPost(contents); // 게시글 삽입
        // return 값 확인
        console.log("----------- return data -------------");
        console.log(result);
        console.log("-------------------------------------");

        return res.send(result);
    },
    /*
     * API No. 4
     * API Name : 게시물 생성(자랑글)
     * [POST] /posts/boast
     */
    postPostBoast: async (req, res) => {
        //const user_id = req.verifiedToken.userId; // 추후에 토큰에서 추출하도록 수정
        const params = req.body;
        params.post_type = "BOAST"; // 게시글 타입: 질문글

        const result = await postService.createPost(params); // 이미지 저장 추후 구현

        // return 값 확인
        console.log("----------- return data -------------");
        console.log(result);
        console.log("-------------------------------------");

        return res.send(result);
    },
}


// 모듈 export
module.exports = {
    output,
    process,
};