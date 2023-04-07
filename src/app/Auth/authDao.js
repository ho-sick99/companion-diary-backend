const mysql = require('mysql2/promise');

// 이메일로 회원 ID 조회
async function selectUserIdWhereEmail(connection, user_email) {
  const query = mysql.format(`SELECT user_id FROM user WHERE user_email=?;`, [user_email]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 회원 가입
async function insertIntoUser(connection, user_email, user_nickname, user_profile_img) {
  const query = mysql.format(`INSERT INTO user(user_email, user_nickname, user_profile_img) VALUES(?, ?, ?);`, [user_email, user_nickname, user_profile_img]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 사용자 other 동식물 추가
async function insertIntoOtherPet(connection, user_id) {
  const animal_profile_img = "animal_default.png";
  const plant_profile_img = "plant_default.png";

  const query = mysql.format(`INSERT INTO pet(user_id, pet_tag, pet_name, pet_age, pet_species, pet_sex, pet_profile_img)
   VALUES (?, "ANIMAL", "OTHER", 0, "OTHER", "OTHER", ?),
    (?, "PLANT", "OTHER", 0, "OTHER", "OTHER", ?);`,
     [user_id, animal_profile_img, user_id, plant_profile_img]);
  const Rows = await connection.query(query);

  return Rows[0];
}


module.exports = {
  selectUserIdWhereEmail,
  insertIntoUser,
  insertIntoOtherPet,
};
