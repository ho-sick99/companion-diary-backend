const userService = require("./userService");
const baseResponse = require("../../../config/baseResponseStatus");
const {response, errResponse} = require("../../../config/response");

/*
 * API No. 1
 * API Name : 사용자 정보 가져오기
 * [GET] /users
 */
exports.getUsers = async function (req, res) {
    const user_email = req.verifiedToken.userEmail;
    const user_nickname = req.verifiedToken.userNicname;
    const user_profile_img = req.verifiedToken.userProfileImage;

    let ob = {user_email : user_email, user_nickname : user_nickname, user_profile_img : user_profile_img};

    // return 값 확인
    console.log("\n----------- return data -------------");
    console.log(response(baseResponse.SUCCESS, ob));
    console.log("-------------------------------------");

    return res.send(response(baseResponse.SUCCESS, ob));
};

/*
 * API No. 2
 * API Name : 프로필 수정
 * [PUT] /users
 */
exports.putUsers = async function (req, res) {
    const user_id = req.verifiedToken.userId;
    const user_email = req.verifiedToken.userEmail;
    const user_nickname = req.body.user_nickname;
    const user_profile_img = req.body.user_profile_img;

    const result = await userService.putUsers(user_id, user_email, user_nickname, user_profile_img);

    // return 값 확인
    console.log("\n----------- return data -------------");
    console.log(result);
    console.log("-------------------------------------");

    return res.send(result);
};

/*
 * API No. 4
 * API Name : 동물/식물 리스트 불러오기
 * [GET] /users/pet
 */
exports.getUsersPet = async function (req, res) {
    const user_id = req.verifiedToken.userId;

    const result = await userService.getPetList(user_id);

    // return 값 확인
    console.log("\n----------- return data -------------");
    console.log(result);
    console.log("-------------------------------------");

    return res.send(result);
};

/*
 * API No. 5
 * API Name : 동물/식물 추가
 * [POST] /users/pet
 */
exports.postUsersPet = async function (req, res) {
    const user_id = req.verifiedToken.userId;
    const pet_tag = req.body.pet_tag;
    const pet_name = req.body.pet_name;
    const pet_age = req.body.pet_age;
    const pet_species = req.body.pet_species;
    const pet_sex = req.body.pet_sex;
    const pet_profile_img = req.body.pet_profile_img;

    const result = await userService.addPet(user_id, pet_tag, pet_name, pet_age, pet_species, pet_sex, pet_profile_img);

    // return 값 확인
    console.log("\n----------- return data -------------");
    console.log(result);
    console.log("-------------------------------------");

    return res.send(result);
};

/*
 * API No. 6
 * API Name : 동물/식물 수정
 * [PUT] /users/pet/:petId
 */
exports.putUsersPet = async function (req, res) {
    const user_id = req.verifiedToken.userId;
    const pet_tag = req.body.pet_tag;
    const pet_name = req.body.pet_name;
    const pet_age = req.body.pet_age;
    const pet_species = req.body.pet_species;
    const pet_sex = req.body.pet_sex;
    const pet_profile_img = req.body.pet_profile_img;
    const pet_id = req.params.petId;

    const result = await userService.modifyPet(user_id, pet_tag, pet_name, pet_age, pet_species, pet_sex, pet_profile_img, pet_id);

    // return 값 확인
    console.log("\n----------- return data -------------");
    console.log(result);
    console.log("-------------------------------------");

    return res.send(result);
};

/*
 * API No. 7
 * API Name : 동물/식물 삭제
 * [DELETE] /users/pet/:petId
 */
exports.delectUsersPet = async function (req, res) {
    const user_id = req.verifiedToken.userId;
    const pet_id = req.params.petId;

    const result = await userService.removePet(user_id, pet_id);

    // return 값 확인
    console.log("\n----------- return data -------------");
    console.log(result);
    console.log("-------------------------------------");

    return res.send(result);
};