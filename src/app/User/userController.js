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
    let user_profile_img = req.body.user_profile_img;

    // user_profile_img 값이 null 이면, 기본 이미지로 변경
    if (user_profile_img == null) {
        user_profile_img = "data:image/png;base64,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";
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
    let pet_profile_img = req.body.pet_profile_img;

    // pet_profile_img가 null 값이면 기본 이미지로 변경
    if (pet_profile_img == null) {
        if (pet_tag == "ANIMAL") {
            pet_profile_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAP5SURBVHgBxVjNS1RRFD/3zfhR0DSgUehkLyiSgjKKqOy7RdFCW5RRuyhoFSVBLR3/gjFK3BRtalG2UBeVLUwEPyCiFDRr48NRC1TUMdCZ8d3TOffpOM/RcfwY3w+GN/fz/O455957zhWwQkSf+c5pGaJUZOUUoWenDq5NeqzRnDJEKGhgePSHjGJ9xv2BZlgBRCqdMOD1QrbnAeadegi7L3hF3gmAnP1LDxjtARxqB/jdYODw9+bIdLRyU/lfA9YCJoE1BRWy/tYYDrbjqkDj5Ic7yPPAaoGBHbp8c6Zv1SQWQPa+Q/PN6b4pmnclPCASyC8ya6+MYSiI6wqaj+eNVOcXpUxENj8ew+kJTAtoXrP5yfKE2DRKI+kiEk+I5CQ1mfKR9TbNUmCTkQ+pnZqglRpfBTvZRkIOtmG0usCfaJ6Pd9EJmA03x+a0oynzZGdUaAfvgBMQR+57ZzI9D2NkxLbD5yDvODgBPs21ncUPFBm+a2BviQ4OQuy66FV3Hunmqsg/YW8NhwC7XgI2PQLsrVXl+Lb4sqwpAJgcgLVA3XXEQ3Ntzj208NKT9WWAfZ9BkRzqAFl7OUYAWyuprRHWFbn7gXm4wVOgx9crQZEQaGWfLNb7rgEyuV+koS0+6zaeDKo+Ytbp6f4CMGhc5lYQxXQfZnmUtrDVby2C+ondl6x+rEX+8fji+buTwxENXdk2MqwJkXvAVqXKIz3WlwSJnANgMy2FDOLgXUAiNKc11i4QAXHKD/jlkUXq3yBgW6UKXEThNbsM4uFOUBkPyvTY6zKtlbJmBP8ntcabVmmI2/RLVj9akKpnqbwI6qtICirzQo6Ww2LQEmpIELIZ4jHSnTyYWgAMT9jKorAMEjbJYmSEOW3YBu67btn7a8D68q76Q6YrvG51YM2QWZJB7Q7yCUWKfE5pkjSXdAHEQ4NQv2GrJZ/QSt+Ro3bEdpVW+nZ+smPls203rDILnjOrJ59+PsuvaAyPla9Pgux8OWv+LRaxxcgwj2i1rwpHutFRDHcj89BAQp3acg5CHRfEQxVkAwXcDkK+L+ljHmo3mcGWp4qdEyD/43QmRsYdcVfBt+fj4ACw6wVEwFVpqyQH8nPktaHmocgyIdJTDAO6d6NjYEkxcDyH2Aksyo1xEeo/LxvvjdtChnSAQxSSEw4FzyftF6nWKW96kta8ifMylgOpgDumK6OUKqNMkcgcsEZXubb8uU7pCz8AcK5N88JqoXYZpzFreYWgVwyeB1/p3mSyUnufodWYaPq17YfPwp4SXYUDy73PqOivadwcaHnq3uyuEreNZc+xlMjEQ2UTbrjqyqbYmUNWV5YeazTDBkcB5vRIJ8xA3Upfrv4D6Xi957+wUOwAAAAASUVORK5CYII=";
            
        } else if (pet_tag == "PLANT") {
            pet_profile_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAP2SURBVHgBxVhbSFRRFN1zx7QoTYxSSmIEtUma9KMsCMoyQsqmWx9RHxVCUVSU0VdFZR9GnyMUBD2mx0cQPUwkDByySFLrQ1NSSJqLWWqSj5mRHEtvZx2503F83dHRu0CH89p7nb33OWfva6IQkXsrOcsUYd61cG5cRnx0oiXKPNeijfkH+5UO7zelt7+7Vv07+KL0SHMFhQCTnklZTktsDEWeTl+6IX9N4qZYW8I6Soqzjjvf3dVE9e3V9Nb9UmnurK3wk3SlLK9JoekAJOzO1MsXX+V117dVq1MB1hW6TqiQQ1NFjtNqOfp0m3uqJILh+vJMhTzIDYUHbXemZZwp2dPd4W1VwwnIg9ztzpQM3USuV17q9vk96kzA5+9VbzD5kxKCCcF8poiIhKBnQpfBp+F2zXiAHujDIRlFBNFezoJsNoHDYb+TWjDKPYWu46oRwLWhWUfCvzlEl+1ph8gI7F19LDZmKDI/QCZ1sS1rVUImGQHoTU/ccJqTwVuzMWmHhQwEnphcpzVLksxmGW+NiL4BL5V8vk9F786Rq/k5b4tjYnvXPSv99H2n6YDrVwdlaeG8uPTgR+9C2QGqbnGxSZnU0F5D+SVygMDtmqtU1VJO4QT0x85blB6RwNIAcaCKkYBih72Yt7ck72bkDjILPaP4Bcs4OViib8BDWtDXs75qRnB+ZAwdzjzPfqP5HBCHLHvaQVq3fCufh35tPeZqiI9ebpHmCPkI0MCe/mBLoY20ICluJVeItuhapauREwMhzWrYwHpGAArhbpDqZCTuMILIW7KT94zQEWWOskQEmwyLoFAE2tjNEmYZ7BqkRMI7GRGMYfeYB+tpcDOimA+SJr6xlbQv4ySNBSm4A0qCA1Kzil74hAAHspmrbTquDukPSxWDF4LMo9rr/BenCq5DPwArYbcTwZawlseEj/0h5rARWG4i+Af9itTubVXETigrzHnATQ2/41QV5jwMCNvPTNzQ/oGPAbi0NLciwOO5K2P4Gqw98iSbb0hz/3jpaoe3RSH73RWOr78aVSMB/bl3UxzSkMlUjOTZSHD9JvPwXYKXUzUQZ0v3usGDn6a61soi8TjOJqAX5UyAjCQNOB5/utlDBgDBbWJ11YhOZFzhKkv0AuWL3WktGMVQZtmWETmwyCFwAxfnKT0dnpbN116f6ukLukHDDciHHuibcKLM6qYbM1o3eVTUZdBDeiDPcEWpm8h/QsO1drjKFxwOyJNDrbVFINpRxkznKwQuVciRxyrYBOj6PoPdDKlUkLLEtgnJu97vMx9b3/TU/XhfJFG/AwdkMj26yIjgWbyqysidkbKKmSLSkTaWBXh+d9XhzSvNa6qgEPAPqn3C6GRAYHwAAAAASUVORK5CYII=";
        }
        else {
            res.send(errResponse(baseResponse.SERVER_ERROR));
        }
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
    let pet_profile_img = req.body.pet_profile_img;
    const pet_id = req.params.petId;

    // pet_profile_img가 null 값이면 기본 이미지로 변경
    if (pet_profile_img == null) {
        if (pet_tag == "ANIMAL") {
            pet_profile_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAP5SURBVHgBxVjNS1RRFD/3zfhR0DSgUehkLyiSgjKKqOy7RdFCW5RRuyhoFSVBLR3/gjFK3BRtalG2UBeVLUwEPyCiFDRr48NRC1TUMdCZ8d3TOffpOM/RcfwY3w+GN/fz/O455957zhWwQkSf+c5pGaJUZOUUoWenDq5NeqzRnDJEKGhgePSHjGJ9xv2BZlgBRCqdMOD1QrbnAeadegi7L3hF3gmAnP1LDxjtARxqB/jdYODw9+bIdLRyU/lfA9YCJoE1BRWy/tYYDrbjqkDj5Ic7yPPAaoGBHbp8c6Zv1SQWQPa+Q/PN6b4pmnclPCASyC8ya6+MYSiI6wqaj+eNVOcXpUxENj8ew+kJTAtoXrP5yfKE2DRKI+kiEk+I5CQ1mfKR9TbNUmCTkQ+pnZqglRpfBTvZRkIOtmG0usCfaJ6Pd9EJmA03x+a0oynzZGdUaAfvgBMQR+57ZzI9D2NkxLbD5yDvODgBPs21ncUPFBm+a2BviQ4OQuy66FV3Hunmqsg/YW8NhwC7XgI2PQLsrVXl+Lb4sqwpAJgcgLVA3XXEQ3Ntzj208NKT9WWAfZ9BkRzqAFl7OUYAWyuprRHWFbn7gXm4wVOgx9crQZEQaGWfLNb7rgEyuV+koS0+6zaeDKo+Ytbp6f4CMGhc5lYQxXQfZnmUtrDVby2C+ondl6x+rEX+8fji+buTwxENXdk2MqwJkXvAVqXKIz3WlwSJnANgMy2FDOLgXUAiNKc11i4QAXHKD/jlkUXq3yBgW6UKXEThNbsM4uFOUBkPyvTY6zKtlbJmBP8ntcabVmmI2/RLVj9akKpnqbwI6qtICirzQo6Ww2LQEmpIELIZ4jHSnTyYWgAMT9jKorAMEjbJYmSEOW3YBu67btn7a8D68q76Q6YrvG51YM2QWZJB7Q7yCUWKfE5pkjSXdAHEQ4NQv2GrJZ/QSt+Ro3bEdpVW+nZ+smPls203rDILnjOrJ59+PsuvaAyPla9Pgux8OWv+LRaxxcgwj2i1rwpHutFRDHcj89BAQp3acg5CHRfEQxVkAwXcDkK+L+ljHmo3mcGWp4qdEyD/43QmRsYdcVfBt+fj4ACw6wVEwFVpqyQH8nPktaHmocgyIdJTDAO6d6NjYEkxcDyH2Aksyo1xEeo/LxvvjdtChnSAQxSSEw4FzyftF6nWKW96kta8ifMylgOpgDumK6OUKqNMkcgcsEZXubb8uU7pCz8AcK5N88JqoXYZpzFreYWgVwyeB1/p3mSyUnufodWYaPq17YfPwp4SXYUDy73PqOivadwcaHnq3uyuEreNZc+xlMjEQ2UTbrjqyqbYmUNWV5YeazTDBkcB5vRIJ8xA3Upfrv4D6Xi957+wUOwAAAAASUVORK5CYII=";
            
        } else if (pet_tag == "PLANT") {
            pet_profile_img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAP2SURBVHgBxVhbSFRRFN1zx7QoTYxSSmIEtUma9KMsCMoyQsqmWx9RHxVCUVSU0VdFZR9GnyMUBD2mx0cQPUwkDByySFLrQ1NSSJqLWWqSj5mRHEtvZx2503F83dHRu0CH89p7nb33OWfva6IQkXsrOcsUYd61cG5cRnx0oiXKPNeijfkH+5UO7zelt7+7Vv07+KL0SHMFhQCTnklZTktsDEWeTl+6IX9N4qZYW8I6Soqzjjvf3dVE9e3V9Nb9UmnurK3wk3SlLK9JoekAJOzO1MsXX+V117dVq1MB1hW6TqiQQ1NFjtNqOfp0m3uqJILh+vJMhTzIDYUHbXemZZwp2dPd4W1VwwnIg9ztzpQM3USuV17q9vk96kzA5+9VbzD5kxKCCcF8poiIhKBnQpfBp+F2zXiAHujDIRlFBNFezoJsNoHDYb+TWjDKPYWu46oRwLWhWUfCvzlEl+1ph8gI7F19LDZmKDI/QCZ1sS1rVUImGQHoTU/ccJqTwVuzMWmHhQwEnphcpzVLksxmGW+NiL4BL5V8vk9F786Rq/k5b4tjYnvXPSv99H2n6YDrVwdlaeG8uPTgR+9C2QGqbnGxSZnU0F5D+SVygMDtmqtU1VJO4QT0x85blB6RwNIAcaCKkYBih72Yt7ck72bkDjILPaP4Bcs4OViib8BDWtDXs75qRnB+ZAwdzjzPfqP5HBCHLHvaQVq3fCufh35tPeZqiI9ebpHmCPkI0MCe/mBLoY20ICluJVeItuhapauREwMhzWrYwHpGAArhbpDqZCTuMILIW7KT94zQEWWOskQEmwyLoFAE2tjNEmYZ7BqkRMI7GRGMYfeYB+tpcDOimA+SJr6xlbQv4ySNBSm4A0qCA1Kzil74hAAHspmrbTquDukPSxWDF4LMo9rr/BenCq5DPwArYbcTwZawlseEj/0h5rARWG4i+Af9itTubVXETigrzHnATQ2/41QV5jwMCNvPTNzQ/oGPAbi0NLciwOO5K2P4Gqw98iSbb0hz/3jpaoe3RSH73RWOr78aVSMB/bl3UxzSkMlUjOTZSHD9JvPwXYKXUzUQZ0v3usGDn6a61soi8TjOJqAX5UyAjCQNOB5/utlDBgDBbWJ11YhOZFzhKkv0AuWL3WktGMVQZtmWETmwyCFwAxfnKT0dnpbN116f6ukLukHDDciHHuibcKLM6qYbM1o3eVTUZdBDeiDPcEWpm8h/QsO1drjKFxwOyJNDrbVFINpRxkznKwQuVciRxyrYBOj6PoPdDKlUkLLEtgnJu97vMx9b3/TU/XhfJFG/AwdkMj26yIjgWbyqysidkbKKmSLSkTaWBXh+d9XhzSvNa6qgEPAPqn3C6GRAYHwAAAAASUVORK5CYII=";
        }
        else {
            res.send(errResponse(baseResponse.SERVER_ERROR));
        }
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