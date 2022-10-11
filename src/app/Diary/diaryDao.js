const mysql = require('mysql2/promise');

// 사용자(userId)의 모든 일기 조회
async function selectDiary(connection, userId) {
  const query = mysql.format(`SELECT * FROM COMPAION_DIARY_DB.diary WHERE user_id=?;`, [userId]);
  const Rows = await connection.query(query);

  return Rows;
}

// 사용자(userId)의 일기 생성
async function insertIntoDiary(connection, petId, userId, content, title, img_url_1, img_url_2, img_url_3, img_url_4, img_url_5) {
  const query = mysql.format(`INSERT INTO COMPAION_DIARY_DB.diary(
    animal_plant_data_id, user_id, diary_content, diary_title, 
    diary_img_url_1, diary_img_url_2, diary_img_url_3, diary_img_url_4, diary_img_url_5
  ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);`, [petId, userId, content, title, img_url_1, img_url_2, img_url_3, img_url_4, img_url_5]);
  const Rows = await connection.query(query);

  return Rows;
}

// // userId 회원 조회
// async function selectUserIdx(connection, userIdx) {
//   const selectUserIdxQuery = `
//                   SELECT email, nickname, name
//                   FROM User 
//                   WHERE userIdx = ?;
//                   `;
//   const [userRow] = await connection.query(selectUserIdxQuery, userIdx);
//   return userRow;
// }

// // 유저 생성
// async function insertUserInfo(connection, insertUserInfoParams) {
//   const insertUserInfoQuery = `
//         INSERT INTO UserInfo(email, password, nickname)
//         VALUES (?, ?, ?);
//     `;
//   const insertUserInfoRow = await connection.query(
//     insertUserInfoQuery,
//     insertUserInfoParams
//   );

//   return insertUserInfoRow;
// }

// // 패스워드 체크
// async function selectUserPassword(connection, selectUserPasswordParams) {
//   const selectUserPasswordQuery = `
//         SELECT email, nickname, password
//         FROM UserInfo 
//         WHERE email = ? AND password = ?;`;
//   const selectUserPasswordRow = await connection.query(
//       selectUserPasswordQuery,
//       selectUserPasswordParams
//   );

//   return selectUserPasswordRow;
// }

// // 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
// async function selectUserAccount(connection, email) {
//   const selectUserAccountQuery = `
//         SELECT status, id
//         FROM UserInfo 
//         WHERE email = ?;`;
//   const selectUserAccountRow = await connection.query(
//       selectUserAccountQuery,
//       email
//   );
//   return selectUserAccountRow[0];
// }

// async function updateUserInfo(connection, id, nickname) {
//   const updateUserQuery = `
//   UPDATE UserInfo 
//   SET nickname = ?
//   WHERE id = ?;`;
//   const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
//   return updateUserRow[0];
// }


module.exports = {
  selectDiary,
  insertIntoDiary,
  // selectUserEmail,
  // selectUserIdx,
  // insertUserInfo,
  // selectUserPassword,
  // selectUserAccount,
  // updateUserInfo,
};
  