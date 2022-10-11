const mysql = require('mysql2/promise');

// 이메일로 회원 ID 조회
async function selectUserIdWhereEmail(connection, email) {
  // const selectUserEmailQuery = `SELECT EXISTS (SELECT user_id from COMPAION_DIARY_DB.user WHERE user_email = ? LIMIT 1) AS SUCCESS;`

  const query = mysql.format(`SELECT user_id FROM COMPAION_DIARY_DB.user WHERE user_email=?;`, [email]);
  const Rows = await connection.query(query);

  return Rows;
}

// 회원 가입
async function insertIntoUser(connection, email, nickname, profile_image) {
  const query = mysql.format(`INSERT INTO COMPAION_DIARY_DB.user(user_email, user_nickname, profile_img_url) VALUES(?, ?, ?);`, [email, nickname, profile_image]);
  const Rows = await connection.query(query);

  return Rows;
}

// userId 회원 조회
async function selectUserIdx(connection, userIdx) {
  const selectUserIdxQuery = `
                 SELECT email, nickname, name
                 FROM User 
                 WHERE userIdx = ?;
                 `;
  const [userRow] = await connection.query(selectUserIdxQuery, userIdx);
  return userRow;
}

// 패스워드 체크
async function selectUserPassword(connection, selectUserPasswordParams) {
  const selectUserPasswordQuery = `
        SELECT email, nickname, password
        FROM UserInfo 
        WHERE email = ? AND password = ?;`;
  const selectUserPasswordRow = await connection.query(
      selectUserPasswordQuery,
      selectUserPasswordParams
  );

  return selectUserPasswordRow;
}

// 유저 계정 상태 체크 (jwt 생성 위해 id 값도 가져온다.)
async function selectUserAccount(connection, email) {
  const selectUserAccountQuery = `
        SELECT status, id
        FROM UserInfo 
        WHERE email = ?;`;
  const selectUserAccountRow = await connection.query(
      selectUserAccountQuery,
      email
  );
  return selectUserAccountRow[0];
}

async function updateUserInfo(connection, id, nickname) {
  const updateUserQuery = `
  UPDATE UserInfo 
  SET nickname = ?
  WHERE id = ?;`;
  const updateUserRow = await connection.query(updateUserQuery, [nickname, id]);
  return updateUserRow[0];
}


module.exports = {
  selectUserIdWhereEmail,
  selectUserIdx,
  insertIntoUser,
  selectUserPassword,
  selectUserAccount,
  updateUserInfo,
};
