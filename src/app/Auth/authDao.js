const mysql = require('mysql2/promise');

// 이메일로 회원 ID 조회
async function selectUserIdWhereEmail(connection, user_email) {
  const query = mysql.format(`SELECT user_id FROM COMPAION_DIARY_DB.user WHERE user_email=?;`, [user_email]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 회원 가입
async function insertIntoUser(connection, user_email, user_nickname, user_profile_img) {
  const query = mysql.format(`INSERT INTO COMPAION_DIARY_DB.user(user_email, user_nickname, user_profile_img) VALUES(?, ?, ?);`, [user_email, user_nickname, user_profile_img]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 사용자 other 동식물 추가
async function insertIntoOtherPet(connection, user_id) {
  const query = mysql.format(`INSERT INTO COMPAION_DIARY_DB.pet(user_id, pet_tag, pet_name, pet_age, pet_species, pet_sex, pet_profile_img) VALUES (?, "ANIMAL", "OTHER", 0, "OTHER", "OTHER", null), (?, "PLANT", "OTHER", 0, "OTHER", "OTHER", null);`, [user_id, user_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}


module.exports = {
  selectUserIdWhereEmail,
  insertIntoUser,
  insertIntoOtherPet,
};
