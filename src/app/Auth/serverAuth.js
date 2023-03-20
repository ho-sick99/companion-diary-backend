const authService = require("./authService");

/*
    서버 개발용 인가코드 발급
 */
exports.getAuthorizationCode = async function (req, res) {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENTID}&redirect_uri=${process.env.KAKAO_REDIRECTURL}&response_type=code`;
    res.redirect(kakaoAuthURL);
};

/*
    서버 개발용 인가토큰 발급
*/
exports.getAuthorizationToken = async function (req, res) {
    console.log("a")
    let token = null;
    console.log(req)

    try { //access토큰을 받기 위한 코드
        token = await axios({
            method: 'POST',
            url: 'https://kauth.kakao.com/oauth/token',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: JSON.stringify({
                grant_type: 'authorization_code',
                client_id: process.env.KAKAO_CLIENTID,
                redirectUri: process.env.KAKAO_REDIRECTURL,
                code: req.query.code,
            })
        })
    } catch (err) {
        res.json(err.data);
    }
    console.log(token)

    return res.send(token.access_token);
};