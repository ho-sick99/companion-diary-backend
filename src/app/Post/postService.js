const postProvider = require("./postProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const { response } = require("../../../config/response");
const { errResponse } = require("../../../config/response");

// 게시글 list 조회
exports.getPostsList = async (post_type, pet_tag) => {
    try {
        // 댓글 개수 반환 메서드 추가해야함
        const result = await postProvider.retrievePostList(post_type, pet_tag); // 게시글 타입, 동식물 태그
        return response(baseResponse.SUCCESS, result);
    } catch (err) {
        console.log("----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.DB_ERROR);
    }
}

// 게시글 콘텐츠 생성
exports.createContents = (user_id, requestBody, requestFiles, content_id = null) => {
    const contents = requestBody; // 게시글 내용
    contents.user_id = user_id; // 토큰에서 추출한 유저 id
    const imgs = requestFiles; // 사용자가 업로드한 이미지들의 정보
    if (imgs) { // 이미지가 존재할 경우
        contents.imagesPath = requestFiles.map((data) => {
            return data.filename; // 업로드받은 후 저장한 사진들의 이름
        })
    }
    if (content_id) { // 현재 생성하는 콘텐츠의 아이디가 있다면 (수정 작업)
        contents.content_id = content_id; // 콘텐츠 아이디 지정
    }

    return contents; // 게시글 콘텐츠 반환
}

// 게시물 조회
exports.getPost = async (post_type, post_id) => {
    try {
        // 댓글 메서드 추가해야함
        const result = await postProvider.getPost(post_type, Number(post_id)); // post_id 숫자형으로 변환 
        return response(baseResponse.SUCCESS, result);
    } catch (err) {
        console.log("----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.DB_ERROR);
    }
}

// 게시물 생성
exports.createPost = async (contents) => {
    try {
        await postProvider.createPost(contents);

        return response(baseResponse.SUCCESS);

    } catch (err) {
        console.log("----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.DB_ERROR);
    }
}

// 일기 수정
exports.modifyPost = async (contents) => {
    try {
        const writer_id = (await postProvider.getPostWriterId(contents.content_id)).user_id; // 게시글 작성자 id

        if (writer_id != contents.user_id) { // 현재 유저 id 와 게시글 작성자 id가 불일치
            return response(baseResponse.FORBIDDEN);
        }

        await postProvider.modifyPost(contents);

        return response(baseResponse.SUCCESS);

    } catch(err) {
        console.log("----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.DB_ERROR);
    }
}

// 게시물 삭제
exports.deletePost = async (user_id, post_id) => {
    try {
        const writer_id = (await postProvider.getPostWriterId(post_id)).user_id; // 게시글 작성자 id

        if (writer_id != user_id) { // 현재 유저 id 와 게시글 작성자 id가 불일치
            return response(baseResponse.FORBIDDEN);
        }

        await postProvider.deletePost(post_id);

        return response(baseResponse.SUCCESS);

    } catch (err) {
        console.log("----------------------------------------------------------");
        console.log(err);
        console.log("----------------------------------------------------------");

        return errResponse(baseResponse.DB_ERROR);
    }
}