const mysql = require('mysql2/promise');

// 사용자의 반려동식물 리스트 조회
async function selectUsersAllPetList(connection, user_id) {
  const query = mysql.format(`SELECT pet_id, pet_tag, pet_name, pet_age, pet_species, pet_sex, pet_profile_img FROM COMPAION_DIARY_DB.pet WHERE user_id = ?;`, [user_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}


// 사용자의 반려동식물 추가
async function insertIntoPet(connection, user_id, pet_tag, pet_name, pet_age, pet_species, pet_sex, pet_profile_img) {
  const query = mysql.format(`INSERT INTO COMPAION_DIARY_DB.pet(user_id, pet_tag, pet_name, pet_age, pet_species, pet_sex, pet_profile_img) VALUES (?, ?, ?, ?, ?, ?, ?);`, [user_id, pet_tag, pet_name, pet_age, pet_species, pet_sex, pet_profile_img]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 해당 반려동식물의 user_id 조회
async function selectFromUserIdAtPet(connection, pet_id) {
  const query = mysql.format(`SELECT user_id FROM COMPAION_DIARY_DB.pet WHERE pet_id = ?;`, [pet_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 사용자의 반려동식물 정보 수정
async function updateSetPet(connection, pet_tag, pet_name, pet_age, pet_species, pet_sex, pet_profile_img, pet_id) {
  const query = mysql.format(`UPDATE COMPAION_DIARY_DB.pet SET pet_tag = ?, pet_name = ?, pet_age = ?, pet_species = ?, pet_sex = ?, pet_profile_img = ? WHERE pet_id = ?;`, [pet_tag, pet_name, pet_age, pet_species, pet_sex, pet_profile_img, pet_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 사용자의 반려동식물 삭제
async function deleteFromPet(connection, pet_id) {
  const query = mysql.format(`DELETE FROM COMPAION_DIARY_DB.pet WHERE pet_id = ?;`, [pet_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}

module.exports = {
  selectUsersAllPetList,
  insertIntoPet,
  selectFromUserIdAtPet,
  updateSetPet,
  deleteFromPet,
};
