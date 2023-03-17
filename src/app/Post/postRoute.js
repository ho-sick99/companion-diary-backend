module.exports = function (app) {
    const post = require('./postController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    ////// API 작업 후 jwt 미들웨어 등록 처리해야함 //////

    // 3.1 동물 게시글 전체 조회(질문글)
    app.get("/posts/question/animal", post.output.getPostsQuestionAnimal)

    // 3.2 동물 게시글 전체 조회(자랑글)
    app.get("/posts/boast/animal", post.output.getPostsBoastAnimal)

    // 3.3 식물 게시글 전체 조회(질문글)
    app.get("/posts/question/plant", post.output.getPostsQuestionPlant)

    // 3.4 식물 게시글 전체 조회(자랑글)
    app.get("/posts/boast/plant", post.output.getPostsBoastPlant)

    // 3.9 게시물 조회(질문글)
    app.get("/posts/question/:postId", post.output.getPostQuestion)

    // 3.10 게시물 생성(질문글)
    app.post('/posts/question', post.process.postPostQuestion);

    // 3.11 게시물 생성(자랑글)
    app.post('/posts/boast', post.process.postPostBoast);

};