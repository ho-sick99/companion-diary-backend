const mysql = require('mysql2/promise');

// 사용자의 특정 날짜 일기 모두 조회
async function selectFromAllDiaryList(connection, select_date_start, select_date_end, user_id) {
  const query = mysql.format(``, [select_date_start, select_date_end, user_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}

module.exports = {
  selectFromAllDiaryList,
};
  