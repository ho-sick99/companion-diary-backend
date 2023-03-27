const { default: axios } = require("axios");
const authService = require("./authService");
const qs = require("qs");

/*
    서버 개발용 인가코드 발급
 */
exports.getAuthorizationCode = async (req, res) => {
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_CLIENTID}&redirect_uri=${process.env.KAKAO_REDIRECTURL}&response_type=code`;
    res.redirect(kakaoAuthURL);
};

/*
    서버 개발용 인가토큰 발급
*/
exports.getAuthorizationToken = async (req, res) => {
    let token = null;
    const data = {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_CLIENTID,
        redirectUri: process.env.KAKAO_REDIRECTURL,
        code: req.query.code,
    };

    try { // access 토큰 발급
        token = (await axios.post('https://kauth.kakao.com/oauth/token', qs.stringify(data), {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        })).data
    } catch (err) {
        res.json(err);
    }
    
    const loginToken = await authService.signIn(token.access_token); // access 토큰을 기반으로 jwt 토큰 발급

    return res.send(loginToken);
};