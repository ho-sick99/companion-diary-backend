module.exports = function(app){
    const post = require('./postController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 3.10 게시물 생성(질문글)
    app.post('/posts/question', jwtMiddleware, post.postPostQuestion);

};