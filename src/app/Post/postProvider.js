const { pool } = require("../../../config/database");
const postDao = require("./postDao");

// Provider: Read 비즈니스 로직 처리

// 동물 게시글 리스트 조회
exports.retrievePostList = async (post_type, pet_tag) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await postDao.selectFromAllPostList(connection, post_type, pet_tag);
  connection.release();

  return result;
}

// 게시물 조회(질문글)
exports.getPostQuestion = async (post_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await postDao.selectPost(connection, post_id);
  connection.release();

  return result;
}
