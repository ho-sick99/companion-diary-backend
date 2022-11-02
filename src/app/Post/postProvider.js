const { pool } = require("../../../config/database");
const postDao = require("./postDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveDiaryList = async function (select_date_start, select_date_end, user_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await postDao.selectFromAllDiaryList(connection, select_date_start, select_date_end, user_id);
  connection.release();

  return result;
};