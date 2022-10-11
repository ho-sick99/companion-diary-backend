const jwtMiddleware = require("../../../config/jwtMiddleware");
const diaryProvider = require("../../app/Diary/diaryProvider");
const diaryService = require("../../app/Diary/diaryService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

const regexEmail = require("regex-email");
const {emit} = require("nodemon");

/**
 * API No. 1
 * API Name : 사용자의 일기 리스트 조회 API
 * [GET] /app/diary?userId=
 */
exports.getDiaryList = async function (req, res) {
    // console.log(JSON.stringify(req));

    // req.body 에서 userId 받아와서 저장
    const userId = 1;

    // 사용자(user_id)의 일기 리스트 조회
    const getDiaryListResult = await diaryService.getDiaryList(userId);
    
    // return 값 확인
    console.log("----------- return data -------------");
    console.log(getDiaryListResult);
    console.log("-------------------------------------");

    return res.send(getDiaryListResult);
};

/**
 * API No. 2
 * API Name : 일기 생성 API
 * [POST] /app/diary?userId=
 */
exports.PostcreateDiary = async function (req, res) {
    // console.log(JSON.stringify(req,body));

    const petId = 1;
    const userId = 1;
    const content = "새로 생성할 일기 내용입니다. !@#$%^&&**()__++_-=~~~``dddd";
    const title = "일기:) 제목입니다.";
    var img_url_1 = "https://cdn.imweb.me/upload/S201910012ff964777e0e3/62f9a36ea3cea.jpg";
    var img_url_2 = "https://www.ui4u.go.kr/depart/img/content/sub03/img_con03030100_01.jpg";
    var img_url_3 = "http://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg";
    var img_url_4 = "https://images.mypetlife.co.kr/content/uploads/2021/10/19151330/corgi-g1a1774f95_1280-1024x682.jpg";
    var img_url_5 = "";

    if (img_url_1.length == 0) { img_url_1 = null; }
    if (img_url_2.length == 0) { img_url_2 = null; }
    if (img_url_3.length == 0) { img_url_3 = null; }
    if (img_url_4.length == 0) { img_url_4 = null; }
    if (img_url_5.length == 0) { img_url_5 = null; }

    // 사용자(userId)의 일기 생성
    const PostcreateDiary = await diaryService.createDiary(petId, userId, content, title, img_url_1, img_url_2, img_url_3, img_url_4, img_url_5);

    // return 값 확인
    console.log("----------- return data -------------");
    console.log(PostcreateDiary);
    console.log("-------------------------------------");

    return res.send(PostcreateDiary);
};
