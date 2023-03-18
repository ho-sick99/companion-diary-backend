const mysql = require('mysql2/promise');

// 질문글 리스트 조회
async function selectQuestionPostList(connection, pet_tag) {
  const query = mysql.format(`
    SELECT post.*, pet.pet_species, pet.pet_profile_img, user.user_nickname, post_title.post_title 
    FROM post, user, pet, post_title 
    WHERE post.user_id = user.user_id 
    and post.pet_id = pet.pet_id
    and post_title.post_id = post.post_id
    and post_type = 1
    and pet.pet_tag=?;`, // post type: 1 -> 질문글
    [pet_tag]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 자랑글 리스트 조회
async function selectBoastPostList(connection, pet_tag) {
  const query = mysql.format(`
    SELECT post.*, pet.pet_species, pet.pet_profile_img, user.user_nickname 
    FROM post, user, pet 
    WHERE post.user_id = user.user_id 
    and post.pet_id = pet.pet_id
    and post_type = 2
    and pet.pet_tag=?;`, // post type: 2 -> 자랑글
    [pet_tag]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 게시물 조회
async function selectPost(connection, post_id) {

  const query = mysql.format(`
  SELECT post.*, user.user_nickname 
  FROM post, user, pet 
  WHERE post.user_id = user.user_id 
  and post.pet_id = pet.pet_id 
  and post.post_id=?;`,
    [post_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}

module.exports = {
  selectQuestionPostList,
  selectBoastPostList,
  selectPost
};