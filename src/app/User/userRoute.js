const { upload } = require("../../../config/multer");

module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');

    // 1.1 사용자 정보 가져오기
    app.get('/users', jwtMiddleware, user.getUsers);

    // 1.2 프로필 수정
    app.put('/users', jwtMiddleware, upload.single('user_img'), user.putUsers); // 싱글 파일

    // 1.3 회원 탈퇴
    app.delete('/users', jwtMiddleware, user.deleteUsers);

    // 1.4 동물/식물 리스트 불러오기
    app.get('/users/pet', jwtMiddleware, user.getUsersPet);

    // 1.5 동물/식물 추가
    app.post('/users/pet', jwtMiddleware, upload.single('pet_profile_img'), user.postUsersPet); // 싱글 파일
    // 1.6 동물/식물 수정
    app.put('/users/pet/:petId', jwtMiddleware, upload.single('pet_profile_img'), user.putUsersPet); // 싱글 파일

    // 1.7 동물/식물 삭제
    app.delete('/users/pet/:petId', jwtMiddleware, user.delectUsersPet);


};