const postProvider = require("./postProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

// 일기 리스트 조회
exports.getDiaryList = async function (select_date_start, select_date_end, user_id) {
    try {
        const result = await postProvider.retrieveDiaryList(select_date_start, select_date_end, user_id);

        return response(baseResponse.SUCCESS, result);

    } catch(err) {
        console.log("----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.DB_ERROR);
    }
}