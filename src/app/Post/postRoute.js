module.exports = function (app) {
    const post = require('./postController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    ////// API 작업 후 jwt 미들웨어 등록 처리해야함 //////

    // 3.1 게시글 리스트 조회 (동물/식물, 질문글/자랑글)
    app.get("/posts", post.output.getPosts)

    // 3.9 게시물 조회
    app.get("/posts/question/:postId", post.output.getPostQuestion)

    // 3.10 게시물 생성(질문글)
    app.post('/posts/question', post.process.postPostQuestion);

    // 3.11 게시물 생성(자랑글)
    app.post('/posts/boast', post.process.postPostBoast);

};