const userProvider = require("./userProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

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