const express = require('express');

module.exports = function () {
    const app = express();

    app.use(express.json());

    // 객체 형태로 전달된 데이터 내에서 또다른 중첩된 객체 허용
    app.use(express.urlencoded({extended: true}));

    /* App (Android, iOS) */
    // TODO: 도메인을 추가할 경우 이곳에 Route를 추가하세요.
    require('../src/app/Auth/authRoute')(app);
    require('../src/app/User/userRoute')(app);
    require('../src/app/Diary/diaryRoute')(app);
    // require('../src/app/Board/boardRoute')(app);

    return app;
};