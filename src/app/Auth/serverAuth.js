/*
    서버 개발용 인가코드 발급
 */
exports.getAuthorizationCode = async function (req, res) {
    console.log(req.query.code);
    return res.send(req.query.code);
};