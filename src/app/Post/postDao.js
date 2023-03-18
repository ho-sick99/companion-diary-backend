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
const createQustionPost = async (connection, postInfo) => {
  try {
    const query = mysql.format(`
    INSERT INTO post (pet_id, user_id, post_type, post_content, post_img_url_1) 
    VALUES (?, ?, ?, ?, ?);`,
      [post_id]);
    const Rows = await connection.query(query);
    console.log(Rows[0]);

    return Rows[0];
  } catch (err) {
    return "db 삽입 에러";
  }
}


// 자랑글 생성

module.exports = {
  selectQuestionPostList,
  selectBoastPostList,
  selectQuestionPost,
  selectBoastPost,
  createQustionPost
};