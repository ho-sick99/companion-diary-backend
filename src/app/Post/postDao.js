const mysql = require('mysql2/promise');

// 질문글 리스트 조회
const selectQuestionPostList = async (connection, pet_tag) => {
  const query = mysql.format(`
    SELECT post.*, pet.pet_species, pet.pet_profile_img, user.user_nickname, post_title.post_title 
    FROM post, user, pet, post_title 
    WHERE post.user_id = user.user_id 
    and post.pet_id = pet.pet_id
    and post_title.post_id = post.post_id
    and post_type = 'QUESTION'
    and pet.pet_tag=?;`, // post type: 1 -> 질문글
    [pet_tag]);
  const Rows = await connection.query(query);
  return Rows[0];
}

// 자랑글 리스트 조회
const selectBoastPostList = async (connection, pet_tag) => {
  const query = mysql.format(`
    SELECT post.*, pet.pet_species, pet.pet_profile_img, user.user_nickname 
    FROM post, user, pet 
    WHERE post.user_id = user.user_id 
    and post.pet_id = pet.pet_id
    and post_type = 'BOAST'
    and pet.pet_tag=?;`, // post type: 2 -> 자랑글
    [pet_tag]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 질문글 조회
const selectQuestionPost = async (connection, post_id) => {
  const query = mysql.format(`
    SELECT post.*, user.user_nickname, post_title.post_title
    FROM post, user, pet, post_title 
    WHERE post.user_id = user.user_id 
    and post.pet_id = pet.pet_id
    and post_title.post_id = post.post_id
    and post_type = 'QUESTION'
    and post.post_id=?;`,
    [post_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 자랑글 조회
const selectBoastPost = async (connection, post_id) => {
  const query = mysql.format(`
    SELECT post.*, user.user_nickname 
    FROM post, user, pet
    WHERE post.user_id = user.user_id 
    and post.pet_id = pet.pet_id
    and post_type = 'BOAST'
    and post.post_id=?;`,
    [post_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 질문글 생성
const createQustionPost = async (connection, params) => {
  const post_id = (await connection.query(
    `SELECT MAX(post_id)+1 FROM post;`
  ))[0][0]['MAX(post_id)+1']; // 가장 최신 게시글 id + 1 = 현재 작성할 게시글 id

  // 게시글 삽입 sql
  const post_sql = mysql.format(`
      INSERT INTO post (post_id, pet_id, user_id, post_type, post_content) VALUES (?, ?, ?, ?, ?); `,
    [post_id, params.pet_id, params.user_id, params.post_type, params.post_content]);
  // 게시글 제목 삽입 sql
  const post_title_sql = mysql.format(`
      INSERT INTO post_title (post_id, post_title) VALUES (?, ?);`,
    [post_id, params.post_title]);

  const Rows = await connection.query(post_sql + post_title_sql);

  return Rows[0];
}

// 자랑글 생성
const createBoastPost = async (connection, params) => {
  // 게시글 삽입 sql
  const post_sql = mysql.format(`
      INSERT INTO post (pet_id, user_id, post_type, post_content) VALUES (?, ?, ?, ?); `,
    [params.pet_id, params.user_id, params.post_type, params.post_content]);

  const Rows = await connection.query(post_sql);
  
  return Rows[0];
}

module.exports = {
  selectQuestionPostList,
  selectBoastPostList,
  selectQuestionPost,
  selectBoastPost,
  createQustionPost,
  createBoastPost
};