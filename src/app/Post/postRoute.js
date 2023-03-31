const { upload } = require("../../../config/multer");

module.exports = function (app) {
    const post = require('./postController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 3.1 게시글 리스트 조회 (동물/식물, 질문글/자랑글)
    app.get("/posts/list", jwtMiddleware, post.output.getPosts)

    // 3.2 게시물 조회
    app.get("/posts", jwtMiddleware, post.output.getPost)

    // 3.3 게시물 생성 (질문글)
    app.post('/posts/question', jwtMiddleware, upload.array('post_img'), post.process.postPostQuestion); // 다중 파일

    // 3.4 게시물 생성 (자랑글)
    app.post('/posts/boast', jwtMiddleware, upload.array('post_img'), post.process.postPostBoast); // 다중 파일

    // 3.5 게시물 삭제
    app.delete('/posts/:postId', jwtMiddleware, post.elimination.deletePost);

    // 3.6 게시물 수정 (질문글)
    app.put('/posts/question/:postId', jwtMiddleware, upload.array('post_img'), post.edit.putPostQuestion); // 다중 파일

    // 3.7 게시물 수정 (자랑글)
    app.put('/posts/boast/:postId', jwtMiddleware, upload.array('post_img'), post.edit.putPostBoast); // 다중 파일

    // 3.8 게시물 검색
    app.get('/posts/search', jwtMiddleware, post.output.searchPost);

    // 3.9 댓글 작성
    app.post('/posts/comment', jwtMiddleware, post.process.postComment);
    
    // 3.10 댓글 수정
    app.put('/posts/comment/:commentId', jwtMiddleware, post.edit.putComment);
    
    // 3.11 댓글 삭제
    app.delete('/posts/comment/:commentId', jwtMiddleware, post.elimination.deleteComment);

};