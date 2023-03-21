const { pool } = require("../../../config/database");
const postDao = require("./postDao");

// Provider: Read 비즈니스 로직 처리

// 게시글 리스트 조회
exports.retrievePostList = async (post_type, pet_tag) => {
  const connection = await pool.getConnection(async (conn) => conn);

  const result = await postDao.selectPostList(connection, post_type, pet_tag); // 게시글 리스트 조회
  connection.release();

  return result;
}

// 게시물 조회
exports.getPost = async (post_type, post_id) => {
  const connection = await pool.getConnection(async (conn) => conn);

  const result = await postDao.selectPost(connection, post_type, post_id); // 게시글 조회

  connection.release();

  return result;
}

// 게시글 생성
exports.createPost = async (contents) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await postDao.createPost(connection, contents); // 게시글 생성
  connection.release();

  return result;
}