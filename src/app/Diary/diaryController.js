const diaryService = require("./diaryService");
const postService = require("../Post/postService");

/*
 * API No. 1
 * API Name : 일기 리스트 조회
 * [GET] /diarys
 */
exports.getDiarys = async function (req, res) {
    const user_id = req.verifiedToken.userId;
    const select_date = req.query.date;

    const select_date_start = select_date + " 00:00:00";
    const select_date_end = select_date + " 23:59:59";

    const result = await diaryService.getDiaryList(select_date_start, select_date_end, user_id);

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
    const contents = postService.createContents(req.verifiedToken.userId, req.body, req.files); // 일기 콘텐츠 생성

    const result = await diaryService.createDiary(contents);

    // return 값 확인
    console.log("----------- return data -------------");
    console.log(result);
    console.log("-------------------------------------");

    return res.send(result);
};

/*
 * API No. 3
 * API Name : 일기 조회
 * [GET] /diarys/:diaryId
 */
// exports.getDiarysDiaryId = async function (req, res) {
//     const diary_id = req.params.diaryId;

//     const result = await diaryService.getDiary(diary_id);

//     // return 값 확인
//     console.log("----------- return data -------------");
//     console.log(result);
//     console.log("-------------------------------------");

//     return res.send(result);
// };

/*
 * API No. 4
 * API Name : 일기 수정
 * [PUT] /diarys/:diaryId
 */
exports.putDiarysDiaryId = async function (req, res) {
    const contents = postService.createContents(req.verifiedToken.userId, req.body, req.files, req.params.diaryId); // 일기 콘텐츠 생성
    const result = await diaryService.modifyDiary(contents);

    // return 값 확인
    console.log("----------- return data -------------");
    console.log(result);
    console.log("-------------------------------------");

    return res.send(result);
};

/*
 * API No. 5
 * API Name : 일기 삭제
 * [DELETE] /diarys/:diaryId
 */
exports.deleteDiarysDiaryId = async function (req, res) {
    const user_id = req.verifiedToken.userId;
    const diary_id = req.params.diaryId;

    const result = await diaryService.removeDiary(user_id, diary_id);

    // return 값 확인
    console.log("----------- return data -------------");
    console.log(result);
    console.log("-------------------------------------");

    return res.send(result);
};

/*
 * API No. 6
 * API Name : 월별 일기 날짜 리스트 불러오기
 * [GET] /diarys/list/date
 */
exports.getDiarysList = async function (req, res) {
    const user_id = req.verifiedToken.userId;
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;

    const select_date_start = start_date + " 00:00:00";
    const select_date_end = end_date + " 23:59:59";

    const result = await diaryService.getMonthDiaryList(user_id, select_date_start, select_date_end);

    // return 값 확인
    console.log("----------- return data -------------");
    console.log(result);
    console.log("-------------------------------------");

    return res.send(result);
};