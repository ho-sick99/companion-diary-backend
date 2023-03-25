const diaryProvider = require("./diaryProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

// 일기 리스트 조회
exports.getDiaryList = async function (select_date_start, select_date_end, user_id) {
    try {
        const result = await diaryProvider.retrieveDiaryList(select_date_start, select_date_end, user_id);

        return response(baseResponse.SUCCESS, result);

    } catch(err) {
        console.log("----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.DB_ERROR);
    }
}

// 일기 생성
exports.createDiary = async function (contents) {
    try {
        await diaryProvider.createDiary(contents);

        return response(baseResponse.SUCCESS);

    } catch(err) {
        console.log("----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.DB_ERROR);
    }
}

// 일기 조회
// exports.getDiary = async function (diary_id) {
//     try {
//         const result = await diaryProvider.retrieveDiary(diary_id);

//         return response(baseResponse.SUCCESS, result[0]);

//     } catch(err) {
//         console.log("----------------------------------------------------------");
//         console.log(err);
//         console.log("----------------------------------------------------------");

//         return errResponse(baseResponse.DB_ERROR);
//     }
// }

// 일기 수정
exports.modifyDiary = async function (user_id, pet_id, date, diary_title, diary_content, diary_img_url_1, diary_img_url_2, diary_img_url_3, diary_img_url_4, diary_img_url_5, diary_id) {
    try {
        // 사용자 id == 일기 작성자 id인지 체크
        let diary_owner_id;
        const Owner = await diaryProvider.retrieveDiaryOwnerId(diary_id);

        for (let data of Owner) {
            diary_owner_id = data.user_id;
        }

        if (diary_owner_id != user_id) {
            return response(baseResponse.FORBIDDEN);
        }

        await diaryProvider.modifyDiary(pet_id, date, diary_title, diary_content, diary_img_url_1, diary_img_url_2, diary_img_url_3, diary_img_url_4, diary_img_url_5, diary_id);

        return response(baseResponse.SUCCESS);

    } catch(err) {
        console.log("----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.DB_ERROR);
    }
}

// 일기 삭제
exports.removeDiary = async function (user_id, diary_id) {
    try {
        // 사용자 id == 일기 작성자 id인지 체크
        let diary_owner_id;
        const Owner = await diaryProvider.retrieveDiaryOwnerId(diary_id);

        for (let data of Owner) {
            diary_owner_id = data.user_id;
        }

        if (diary_owner_id != user_id) {
            return response(baseResponse.FORBIDDEN);
        }

        await diaryProvider.removeDiary(diary_id);

        return response(baseResponse.SUCCESS);

    } catch(err) {
        console.log("----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.DB_ERROR);
    }
}

// 월별 일기 날짜 리스트 가져오기
exports.getMonthDiaryList = async function (user_id, select_date_start, select_date_end) {
    try {
        let dayList = [];

        const result = await diaryProvider.getMonthDateList(user_id, select_date_start, select_date_end);
        for (let date of result) {
            dayList.push(date.day)
        }

        return response(baseResponse.SUCCESS, dayList);

    } catch(err) {
        console.log("----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.DB_ERROR);
    }
}