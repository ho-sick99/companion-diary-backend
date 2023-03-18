const { pool } = require("../../../config/database");
const postDao = require("./postDao");

// Provider: Read 비즈니스 로직 처리

// 게시글 리스트 조회
exports.retrievePostList = async (post_type, pet_tag) => {
  const connection = await pool.getConnection(async (conn) => conn);

  let result = null;
  // post type: 1 -> 질문글, 2 -> 자랑글
  if (post_type == 1) {  
    result = await postDao.selectQuestionPostList(connection, pet_tag); // 질문글 리스트 조회
  } else if (post_type == 2) {
    result = await postDao.selectBoastPostList(connection, pet_tag); // 자랑글 리스트 조회
  }

  connection.release();

  return result;
}

// 게시물 조회
exports.getPostQuestion = async (post_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await postDao.selectPost(connection, post_id);
  connection.release();

  return result;
}

