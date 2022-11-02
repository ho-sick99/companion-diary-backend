const mysql = require('mysql2/promise');

// 사용자의 특정 날짜 일기 모두 조회
async function selectFromAllDiaryList(connection, select_date_start, select_date_end, user_id) {
  const query = mysql.format(`SELECT diary.diary_id, diary.pet_id, pet.pet_name, pet.pet_profile_img, pet.pet_tag,
  diary.diary_title, diary.diary_content
  FROM COMPAION_DIARY_DB.diary
  LEFT JOIN COMPAION_DIARY_DB.pet
  ON diary.pet_id = pet.pet_id
  WHERE diary.create_time BETWEEN ? AND ? AND diary.user_id = ?;`, [select_date_start, select_date_end, user_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 일기 생성
async function insertIntoDiary(connection, user_id, pet_id, diary_title, diary_content, diary_img_url_1, diary_img_url_2, diary_img_url_3, diary_img_url_4, diary_img_url_5) {
  const query = mysql.format(`INSERT INTO COMPAION_DIARY_DB.diary(user_id, pet_id, diary_title, diary_content, diary_img_url_1, diary_img_url_2, diary_img_url_3, diary_img_url_4, diary_img_url_5) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`, [user_id, pet_id, diary_title, diary_content, diary_img_url_1, diary_img_url_2, diary_img_url_3, diary_img_url_4, diary_img_url_5]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 일기 조회
async function selectFromDiary(connection, diary_id) {
  const query = mysql.format(`SELECT diary.diary_id, diary.pet_id, pet.pet_name, pet.pet_tag, diary.diary_title, diary.diary_content,
  diary.create_time, diary.update_time, diary.diary_img_url_1,diary. diary_img_url_2, diary.diary_img_url_3,
  diary.diary_img_url_4, diary.diary_img_url_5
  FROM COMPAION_DIARY_DB.diary
  LEFT JOIN COMPAION_DIARY_DB.pet
  ON diary.pet_id = pet.pet_id
  WHERE diary.diary_id = ?;`, [diary_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 일기 작성자 조회
async function selectFromUserIdAtDiary(connection, diary_id) {
  const query = mysql.format(`SELECT user_id FROM COMPAION_DIARY_DB.diary WHERE diary_id = ?;`, [diary_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 일기 수정
async function updateSetDiary(connection, user_id, pet_id, diary_title, diary_content, diary_img_url_1, diary_img_url_2, diary_img_url_3, diary_img_url_4, diary_img_url_5, diary_id) {
  const query = mysql.format(`UPDATE COMPAION_DIARY_DB.diary SET pet_id = ?, diary_title = ?, diary_content = ?, diary_img_url_1 = ?, diary_img_url_2 = ?, diary_img_url_3 = ?, diary_img_url_4 = ?, diary_img_url_5 = ?, update_time = now() WHERE diary_id = ?;`, [user_id, pet_id, diary_title, diary_content, diary_img_url_1, diary_img_url_2, diary_img_url_3, diary_img_url_4, diary_img_url_5, diary_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 일기 삭제
async function deleteFromDiary(connection, diary_id) {
  const query = mysql.format(`DELETE FROM COMPAION_DIARY_DB.diary WHERE diary_id = ?;`, [diary_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}



module.exports = {
  selectFromAllDiaryList,
  insertIntoDiary,
  selectFromDiary,
  selectFromUserIdAtDiary,
  updateSetDiary,
  deleteFromDiary,
};
  