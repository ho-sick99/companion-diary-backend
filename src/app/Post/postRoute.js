module.exports = function(app){
    const post = require('./postController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 3.1 동물 게시글 전체 조회(질문글)
    app.get("/posts/question/animal", jwtMiddleware, post.output.getPostsQuestionAnimal)

    // 3.10 게시물 생성(질문글)
    app.post('/posts/question', jwtMiddleware, post.postPostQuestion);

};