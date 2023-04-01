const jwt = require('jsonwebtoken');
const { response } = require("./response")
const { errResponse } = require("./response")
const baseResponse = require("./baseResponseStatus");

const jwtMiddleware = (req, res, next) => {
    try {
        // console.log("\n----------------------------------------------------------");
        // console.log(req.headers['jwt']);
        // console.log("----------------------------------------------------------");

        // read the token from header
        const token = req.headers['x-access-token'];

        // token does not exist
        if (!token) {
            return res.send(errResponse(baseResponse.TOKEN_EMPTY));
        }

        try {
            // create a promise that decodes the token
            const tokenInfo = new Promise((resolve, reject) => {
                jwt.verify(token, process.env.JWT_SECRET_KEY, (err, verifiedToken) => {
                    if (err) { reject(err); }
                    else { resolve(verifiedToken); }
                });
            });

            // process the promise
            tokenInfo.then((verifiedToken) => {
                //비밀 번호 바뀌었을 때 검증 부분 추가 할 곳
                req.verifiedToken = verifiedToken;
                next();
            });

        } catch (err) {
            console.log("\n----------------------------------------------------------");
            console.log(err);
            console.log("----------------------------------------------------------");

            return res.send(errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE));
        }

    } catch (err) {
        console.log("\n----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return res.send(errResponse(baseResponse.SERVER_ERROR));
    }

};

module.exports = jwtMiddleware;