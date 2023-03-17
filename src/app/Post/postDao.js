const mysql = require('mysql2/promise');

// 동물 게시글 리스트 조회
// post type: 1 -> 질문글, 2 -> 자랑글
async function selectFromAllPostList(connection, post_type, pet_tag) {
  const TAG = {
    0: "ANIMAL", // 동물
    1: "PLANT" // 식물
  }; 
  console.log(TAG[pet_tag]);
  const query = mysql.format(`
    SELECT post.*, pet.pet_species, pet.pet_profile_img, user.user_nickname 
    FROM post, user, pet 
    WHERE post.user_id = user.user_id 
    and post.pet_id = pet.pet_id 
    and post.post_type=?
    and pet.pet_tag=?;`, [post_type, TAG[pet_tag]]);
  const Rows = await connection.query(query);

  return Rows[0];
}
module.exports = {
  selectFromAllPostList,
};