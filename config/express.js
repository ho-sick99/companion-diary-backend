const express = require('express');

module.exports = function () {
    const app = express();
    
    app.use(express.json());

    // 객체 형태로 전달된 데이터 내에서 또다른 중첩된 객체 허용
    app.use(express.urlencoded({ extended: true }));

    // uploads 폴더를 미들웨어 등록하여 사용자들이 서버에 업로드된 정적 이미지 파일들에 접근할수있도록 허용
    app.use('/uploads', express.static("./uploads")); // 가상 경로(/uploads)와 실제 이미지 폴더(./uploads)를 연동

    /* App (Android, iOS) */
    // TODO: 도메인을 추가할 경우 이곳에 Route를 추가하세요.
    require('../src/app/Auth/authRoute')(app);
    require('../src/app/User/userRoute')(app);
    require('../src/app/Diary/diaryRoute')(app);
    require('../src/app/Post/postRoute')(app);

    return app;
};