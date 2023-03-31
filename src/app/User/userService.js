const secret_config = require("../../../config/secret");
const userProvider = require("./userProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");
const jwt = require("jsonwebtoken");

exports.putUsers = async function (user_id, user_email, user_nickname, user_profile_img) {
    try {
        // JWT 발급 후 리턴
        try {
            //토큰 생성 Service
            const jwtToken = jwt.sign(
                {
                    userId : user_id,
                    userEmail : user_email,
                    userNicname : user_nickname,
                    userProfileImage : user_profile_img
                }, // 토큰의 내용(payload)
                process.env.JWT_SECRET_KEY, // 비밀키
                {
                    expiresIn: "365d",
                    subject: "userInfo",
                } // 유효 기간 365일
            );

            // 수정된 user_nickname, user_profile_img 정보 DB에 반영
            await userProvider.updateUserInfo(user_nickname, user_profile_img, user_id);

            // return 값 확인
            console.log("\n----------- return data -------------");
            console.log(response(baseResponse.SUCCESS, {'x-access-token': jwtToken}));
            console.log("-------------------------------------");

            return response(baseResponse.SUCCESS, {'x-access-token': jwtToken});

        } catch (err) {
            console.log("\n----------------------------------------------------------");
            console.log(err);
            console.log("----------------------------------------------------------");

            return errResponse(baseResponse.TOKEN_VERIFICATION_FAILURE);
        }
        
    } catch(err) {
        console.log("\n----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.SERVER_ERROR);
    }
};

exports.deleteUsers = async function (user_id) {
    try {
        await userProvider.removeUserData(user_id);

        return response(baseResponse.SUCCESS);
        
    } catch(err) {
        console.log("\n----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.SERVER_ERROR);
    }
};

exports.getPetList = async function (user_id) {
    try {
        const result = await userProvider.getPetList(user_id);

        return response(baseResponse.SUCCESS, result);
        
    } catch(err) {
        console.log("\n----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.SERVER_ERROR);
    }
};

exports.addPet = async function (user_id, pet_tag, pet_name, pet_age, pet_species, pet_sex, pet_profile_img) {
    try {
        await userProvider.addPet(user_id, pet_tag, pet_name, pet_age, pet_species, pet_sex, pet_profile_img);

        return response(baseResponse.SUCCESS);
        
    } catch(err) {
        console.log("\n----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.SERVER_ERROR);
    }
};

exports.modifyPet = async function (user_id, pet_tag, pet_name, pet_age, pet_species, pet_sex, pet_profile_img, pet_id) {
    try {
        // 사용자 id == pet owner 인지 체크
        let pet_owner_id;
        const Owner = await userProvider.retrievePetOwnerId(pet_id);

        for (let data of Owner) {
            pet_owner_id = data.user_id;
        }

        if (pet_owner_id != user_id) {
            return response(baseResponse.FORBIDDEN);
        }

        await userProvider.modifyPet(pet_tag, pet_name, pet_age, pet_species, pet_sex, pet_profile_img, pet_id);

        return response(baseResponse.SUCCESS);
        
    } catch(err) {
        console.log("\n----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.SERVER_ERROR);
    }
};

exports.removePet = async function (user_id, pet_id) {
    try {
        // 사용자 id == pet owner 인지 체크
        let pet_owner_id;
        const Owner = await userProvider.retrievePetOwnerId(pet_id);

        for (let data of Owner) {
            pet_owner_id = data.user_id;
        }

        if (pet_owner_id != user_id) {
            return response(baseResponse.FORBIDDEN);
        }

        await userProvider.removePet(pet_id);

        return response(baseResponse.SUCCESS);
        
    } catch(err) {
        console.log("\n----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.SERVER_ERROR);
    }
};