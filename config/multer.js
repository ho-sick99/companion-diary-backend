const multer = require('multer'); // 이미지 처리를 위한 multer 미들웨어
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads') // 파일 저장 경로 -> 'uploads/(유저이메일 or 유저id)' 형식으로 변경예정
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // 중복 방지 및 텍스트 인코딩의 편의를 위해 파일 이름을 '현재 시간 + 파일 확장자명'으로 지정
    }
});

exports.upload = multer({ storage: storage });