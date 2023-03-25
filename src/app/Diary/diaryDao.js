const mysql = require('mysql2/promise');

// 사용자의 특정 날짜 일기 모두 조회
async function selectFromAllDiaryList(connection, select_date_start, select_date_end, user_id) {
  const query = mysql.format(`SELECT diary.diary_id, diary.pet_id, pet.pet_name, pet.pet_profile_img, pet.pet_tag,
  diary.diary_title, diary.diary_content,
  diary.date, diary.diary_img_url_1, diary.diary_img_url_2, diary.diary_img_url_3,
  diary.diary_img_url_4, diary.diary_img_url_5
  FROM COMPAION_DIARY_DB.diary
  LEFT JOIN COMPAION_DIARY_DB.pet
  ON diary.pet_id = pet.pet_id
  WHERE diary.date BETWEEN ? AND ? AND diary.user_id = ?;`, [select_date_start, select_date_end, user_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 생성할 일기 id 반환 메서드
const getLastDiaryId = async (connection) => {
  let diary_id = (await connection.query(
    `SELECT MAX(diary_id)+1 FROM diary;`
  ))[0][0]['MAX(diary_id)+1']; // 가장 최신 게시글 id + 1 = 현재 작성할 게시글 id
  if (diary_id == null) {
    diary_id = 1; // 작성된 게시글이 없을 경우의 초기 게시글 식별자 = 1
  }
  return diary_id;
}

// 일기 생성
async function insertIntoDiary(connection, contents) {
  const diary_id = await getLastDiaryId(connection);
  const diary_sql = mysql.format(`
    INSERT INTO diary 
    (diary_id, pet_id, user_id, date, diary_title, diary_content) 
    VALUES (?, ?, ?, ?, ?, ?); 
  `,
    [diary_id, contents.pet_id, contents.user_id, contents.date, contents.diary_title, contents.diary_content]);

  const imagesPath = contents.imagesPath; // 이미지들이 저장된 경로
  let diary_img_sql = ""; // 이미지 경로 삽입 sql
  if (imagesPath) { // 이미지가 존재할 경우
    imagesPath.map((img_url) => {
      diary_img_sql += mysql.format(`
      INSERT INTO diary_img (diary_id, img_url) VALUES (?, ?);`, // 쿼리문 생성
        [diary_id, img_url]);
    });
  }
  
  const Rows = await connection.query(diary_sql + diary_img_sql);

  return Rows[0][0];
}

// 일기 조회
// async function selectFromDiary(connection, diary_id) {
//   const query = mysql.format(`SELECT diary.diary_id, diary.pet_id, pet.pet_name, pet.pet_tag, diary.diary_title, diary.diary_content,
//   diary.date, diary.diary_img_url_1,diary. diary_img_url_2, diary.diary_img_url_3,
//   diary.diary_img_url_4, diary.diary_img_url_5
//   FROM COMPAION_DIARY_DB.diary
//   LEFT JOIN COMPAION_DIARY_DB.pet
//   ON diary.pet_id = pet.pet_id
//   WHERE diary.diary_id = ?;`, [diary_id]);
//   const Rows = await connection.query(query);

//   return Rows[0];
// }

// 일기 작성자 조회
async function selectFromUserIdAtDiary(connection, diary_id) {
  const query = mysql.format(`SELECT user_id FROM COMPAION_DIARY_DB.diary WHERE diary_id = ?;`, [diary_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 일기 수정
async function updateSetDiary(connection, pet_id, date, diary_title, diary_content, diary_img_url_1, diary_img_url_2, diary_img_url_3, diary_img_url_4, diary_img_url_5, diary_id) {
  const query = mysql.format(`UPDATE COMPAION_DIARY_DB.diary SET pet_id = ?, date = ?, diary_title = ?, diary_content = ?, diary_img_url_1 = ?, diary_img_url_2 = ?, diary_img_url_3 = ?, diary_img_url_4 = ?, diary_img_url_5 = ? WHERE diary_id = ?;`, [pet_id, date, diary_title, diary_content, diary_img_url_1, diary_img_url_2, diary_img_url_3, diary_img_url_4, diary_img_url_5, diary_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 일기 삭제
async function deleteFromDiary(connection, diary_id) {
  const query = mysql.format(`DELETE FROM COMPAION_DIARY_DB.diary WHERE diary_id = ?;`, [diary_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 월별 일기 날짜 리스트 불러오기
async function selectDistinctFromDate(connection, user_id, select_date_start, select_date_end) {
  const query = mysql.format(`SELECT DISTINCT DATE_FORMAT(date, '%d') AS "day"
   FROM COMPAION_DIARY_DB.diary WHERE date BETWEEN ? AND ? AND user_id = ?;`, [select_date_start, select_date_end, user_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}

module.exports = {
  selectFromAllDiaryList,
  insertIntoDiary,
  selectFromUserIdAtDiary,
  updateSetDiary,
  deleteFromDiary,
  selectDistinctFromDate,
};
