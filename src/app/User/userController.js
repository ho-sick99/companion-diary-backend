const userService = require("./userService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

/*
 * API No. 1
 * API Name : 사용자 정보 가져오기
 * [GET] /users
 */
exports.getUsers = async function (req, res) {
    const user_email = req.verifiedToken.userEmail;
    const user_nickname = req.verifiedToken.userNicname;
    const user_profile_img = req.verifiedToken.userProfileImage;

    let ob = { user_email: user_email, user_nickname: user_nickname, user_profile_img: user_profile_img };

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
    let user_profile_img = req.file;
    console.log(req)
    if (user_profile_img) { // 이미지가 존재할 경우
        user_profile_img = user_profile_img.filename; // 업로드한 이미지의 이름
    } else { // user_profile_img 값이 null 이면, 기본 이미지로 변경
        user_profile_img = "user_default.png";
    }

    const result = await userService.putUsers(user_id, user_email, user_nickname, user_profile_img);

    // return 값 확인
    console.log("\n----------- return data -------------");
    console.log(result);
    console.log("-------------------------------------");

    return res.send(result);
};

/*
 * API No. 3
 * API Name : 회원 탈퇴
 * [DELETE] /users
 */
exports.deleteUsers = async function (req, res) {
    const user_id = req.verifiedToken.userId;

    const result = await userService.deleteUsers(user_id);

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

// 펫 프로필 사진 경로 결정 메서드
const setProfileImgURL = (pet_tag, pet_profile_img) => {
    pet_profile_img = "";
    if (pet_tag == "ANIMAL") {
        pet_profile_img += "animal";

    } else if (pet_tag == "PLANT") {
        pet_profile_img = "plant";
    }
    else {
        res.send(errResponse(baseResponse.SERVER_ERROR));
    }
    pet_profile_img += "_default.png";

    return pet_profile_img;
}

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
    let pet_profile_img = req.file; // 업로드한 이미지

    if (pet_profile_img) { // 이미지가 존재할 경우
        pet_profile_img = pet_profile_img.filename; // 업로드한 이미지의 이름
    } else { // 이미지가 존재하지 않을 경우
        pet_profile_img = setProfileImgURL(pet_tag, pet_profile_img); // 기본 이미지로 변경
    }

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
    let pet_profile_img = req.file; // 업로드한 이미지
    const pet_id = req.params.petId;

    if (pet_profile_img) { // 이미지가 존재할 경우
        pet_profile_img = pet_profile_img.filename; // 업로드한 이미지의 이름
    } else { // 이미지가 존재하지 않을 경우
        pet_profile_img = setProfileImgURL(pet_tag, pet_profile_img); // 기본 이미지로 변경
    }

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