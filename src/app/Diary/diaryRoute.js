module.exports = function(app){
    const diary = require('./diaryController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1. 일기 리스트 조회 API
    app.get('/app/diary', diary.getDiaryList);

    // 2. 일기 생성 API
    app.get('/app/diary/create', diary.PostcreateDiary);
    // app.post('/app/diary', diary.PostcreateDiary);

    // 3. 일기 수정 API
    // app.patch('/app/diary/:diaryId', diary.modifyDiary)

    // 4. 일기 삭제 API
    // app.patch('/app/diary/:diaryId/status', diary.deleteDiary);

};


// TODO: 자동로그인 API (JWT 검증 및 Payload 내뱉기)
// JWT 검증 API
// app.get('/app/auto-login', jwtMiddleware, user.check);

// TODO: 탈퇴하기 API