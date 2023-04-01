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
    /*
    * API No. 8
    * API Name : 게시글 검색
    * [GET] /posts/question/animal/result?keyword&ptype&ptag
    */
    searchPost: async (req, res) => {
        return res.send(await postService.getSearchPostList(req.query.keyword, req.query.ptype, req.query.ptag))
    }
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
        const contents = postService.createContents(req.verifiedToken.userId, req.body, req.files); // 게시글 콘텐츠 생성
        contents.post_type = "BOAST"; // 게시글 타입: 자랑글

        const result = await postService.createPost(contents); // 게시글 삽입

        // return 값 확인
        console.log("----------- return data -------------");
        console.log(result);
        console.log("-------------------------------------");

        return res.send(result);
    },
    /*
     * API No. 9
     * API Name : 댓글 작성
     * [POST] /posts/comment
     */
    postComment: async (req, res) => {
        const contents = postService.createContents(req.verifiedToken.userId, req.body); // 게시글 콘텐츠 생성

        const result = await postService.createComment(contents); // 댓글 삽입

        // return 값 확인
        console.log("----------- return data -------------");
        console.log(result);
        console.log("-------------------------------------");

        return res.send(result);
    }
}

// PUT
const edit = {
    /*
     * API No. 6
     * API Name : 게시물 수정 (질문글)
     * [PUT] /posts/boast/:postId
     */
    putPostQuestion: async (req, res) => {
        const contents = postService.createContents(req.verifiedToken.userId, req.body, req.files, req.params.postId); // 게시글 콘텐츠 생성
        contents.post_type = "QUESTION"; // 게시글 타입: 질문글

        const result = await postService.modifyPost(contents); // 게시글 수정

        // return 값 확인
        console.log("----------- return data -------------");
        console.log(result);
        console.log("-------------------------------------");

        return res.send(result);
    },
    /*
     * API No. 7
     * API Name : 게시물 수정 (자랑글)
     * [PUT] /posts/boast/:postId
     */
    putPostBoast: async (req, res) => {
        const contents = postService.createContents(req.verifiedToken.userId, req.body, req.files, req.params.postId); // 게시글 콘텐츠 생성
        contents.post_type = "BOAST"; // 게시글 타입: 자랑글

        const result = await postService.modifyPost(contents); // 게시글 수정

        // return 값 확인
        console.log("----------- return data -------------");
        console.log(result);
        console.log("-------------------------------------");

        return res.send(result);
    },
    /*
     * API No. 10
     * API Name : 댓글 수정
     * [PUT] /posts/comment/:commentId
     */
    putComment: async (req, res) => {
        const contents = postService.createContents(req.verifiedToken.userId, req.body, null, req.params.commentId); // 댓글 콘텐츠 생성

        const result = await postService.modifyComment(contents); // 댓글 수정

        // return 값 확인
        console.log("----------- return data -------------");
        console.log(result);
        console.log("-------------------------------------");

        return res.send(result);
    },
    /*
     * API No. 12
     * API Name : 게시물 신고
     * [POST] /posts/service/:postId
     */
    putReport: async (req, res) => {
        const result = await postService.reportPost(req.params.postId); // 게시물 신고

        // return 값 확인
        console.log("----------- return data -------------");
        console.log(result);
        console.log("-------------------------------------");

        return res.send(result);
    }
}

// DELETE
const elimination = {
    /*
    * API No. 5
    * API Name : 게시글 삭제
    * [GET] /posts/:postId
    */
    deletePost: async (req, res) => {
        return res.send(await postService.deletePost(req.verifiedToken.userId, req.params.postId));
    },
    /*
    * API No. 11
    * API Name : 댓글 삭제
    * [GET] /posts/comment/:commentId
    */
    deleteComment: async (req, res) => {
        const contents = postService.createContents(req.verifiedToken.userId, req.body, null, req.params.commentId); // 댓글 콘텐츠 생성

        return res.send(await postService.deleteComment(contents));
    },
}

// 모듈 export
module.exports = {
    output,
    process,
    edit,
    elimination,
};