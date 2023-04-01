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

// 게시글 작성자 Id 반환 메서드
exports.getPostWriterId = async (post_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await postDao.getPostWriterId(connection, post_id);
  connection.release();

  return result;
};

// 게시글 수정 메서드
exports.modifyPost = async (contents) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await postDao.updatePost(connection, contents);
  connection.release();

  return result;
};

// 게시글 삭제 메서드
exports.deletePost = async (post_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await postDao.deletePost(connection, post_id);
  connection.release();

  return result;
};

// 게시글 검색 메서드
exports.searchPostList = async (keyword, post_type, pet_tag) => {
  const connection = await pool.getConnection(async (conn) => conn);

  const result = await postDao.searchPostList(connection, keyword, post_type, pet_tag); // 게시글 리스트 조회
  connection.release();

  return result;
}

// 댓글 작성 메서드
exports.createComment = async (contents) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await postDao.createComment(connection, contents);
  connection.release();

  return result;
}

// 댓글 작성자 Id 반환 메서드
exports.getCommentWriterId = async (comment_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await postDao.getCommentWriterId(connection, comment_id);
  connection.release();

  return result;
};

// 댓글 수정 메서드
exports.modifyComment = async (contents) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await postDao.updateComment(connection, contents);
  connection.release();

  return result;
};

// 댓글 삭제 메서드
exports.deleteComment = async (contents) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await postDao.deleteComment(connection, contents);
  connection.release();

  return result;
};

// 게시글 신고 메서드
exports.reportPost = async (post_id) => {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await postDao.reportPost(connection, post_id); // 게시글 신고횟수 1회 증가
  if (result.report_count >= 3) { // 게시글의 누적 신고 횟수가 3회 이상일 경우
    await postDao.deletePost(connection, post_id); // 게시글 삭제
  }
  connection.release();

  return result;
}