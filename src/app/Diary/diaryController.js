const diaryService = require("../../app/Diary/diaryService");

/*
 * API No. 1
 * API Name : 일기 리스트 조회
 * [GET] /diarys
 */
exports.getDiarys = async function (req, res) {
    const user_id = req.verifiedToken.userId;

    const result = await diaryService.getDiaryList(user_id);
    
    // return 값 확인
    console.log("----------- return data -------------");
    console.log(result);
    console.log("-------------------------------------");

    return res.send(result);
};

/*
 * API No. 2
 * API Name : 일기 생성
 * [POST] /diarys
 */
exports.postDiarys = async function (req, res) {
    const user_id = req.verifiedToken.userId;
    const pet_id = req.body.pet_id;
    const diary_title = req.body.diary_title
    const diary_content = req.body.diary_content
    const diary_img_url_1 = req.body.diary_img_url_1
    const diary_img_url_2 = req.body.diary_img_url_2
    const diary_img_url_3 = req.body.diary_img_url_3
    const diary_img_url_4 = req.body.diary_img_url_4
    const diary_img_url_5 = req.body.diary_img_url_5

    const result = await diaryService.createDiary(user_id, pet_id, diary_title, diary_content, diary_img_url_1, diary_img_url_2, diary_img_url_3, diary_img_url_4, diary_img_url_5);

    // return 값 확인
    console.log("----------- return data -------------");
    console.log(result);
    console.log("-------------------------------------");

    return res.send(result);
};

/*
 * API No. 3
 * API Name : 일기 수정
 * [PUT] /diarys/:diaryId
 */
exports.putDiarys = async function (req, res) {
    const user_id = req.verifiedToken.userId;
    const pet_id = req.body.pet_id;
    const diary_title = req.body.diary_title
    const diary_content = req.body.diary_content
    const diary_img_url_1 = req.body.diary_img_url_1
    const diary_img_url_2 = req.body.diary_img_url_2
    const diary_img_url_3 = req.body.diary_img_url_3
    const diary_img_url_4 = req.body.diary_img_url_4
    const diary_img_url_5 = req.body.diary_img_url_5
    const diary_id = req.params.diaryId;

    const result = await diaryService.modifyDiary(user_id, pet_id, diary_title, diary_content, diary_img_url_1, diary_img_url_2, diary_img_url_3, diary_img_url_4, diary_img_url_5, diary_id);

    // return 값 확인
    console.log("----------- return data -------------");
    console.log(result);
    console.log("-------------------------------------");

    return res.send(result);
};

/*
 * API No. 4
 * API Name : 일기 삭제
 * [DELETE] /diarys/:diaryId
 */
exports.deleteDiarys = async function (req, res) {
    const user_id = req.verifiedToken.userId;
    const diary_id = req.params.diaryId;

    const result = await diaryService.removeDiary(user_id, diary_id);

    // return 값 확인
    console.log("----------- return data -------------");
    console.log(result);
    console.log("-------------------------------------");

    return res.send(result);
};