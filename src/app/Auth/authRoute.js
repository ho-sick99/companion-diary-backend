module.exports = function(app){
    const auth = require('./authController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 2.1. 카카오 소셜 로그인/회원가입
    app.get('/auth/kakao/callback', auth.getSignIn);

    // 2.2 자동 로그인
    app.get('/auth/jwt', jwtMiddleware, auth.jwtCheck);
};