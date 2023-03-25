const { pool } = require("../../../config/database");
const diaryDao = require("./diaryDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveDiaryList = async function (select_date_start, select_date_end, user_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await diaryDao.selectFromAllDiaryList(connection, select_date_start, select_date_end, user_id);
  connection.release();

  return result;
};

// exports.retrieveDiary = async function (diary_id) {
//   const connection = await pool.getConnection(async (conn) => conn);
//   const result = await diaryDao.selectFromDiary(connection, diary_id);
//   connection.release();

//   return result;
// };

exports.createDiary = async function (contents) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await diaryDao.insertIntoDiary(connection, contents);
  connection.release();

  return result;
};

exports.retrieveDiaryOwnerId = async function (diary_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await diaryDao.selectFromUserIdAtDiary(connection, diary_id);
  connection.release();

  return result;
};

exports.modifyDiary = async function (contents) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await diaryDao.updateSetDiary(connection, contents);
  connection.release();

  return result;
};

exports.removeDiary = async function (diary_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await diaryDao.deleteFromDiary(connection, diary_id);
  connection.release();

  return result;
};

exports.getMonthDateList = async function (user_id, select_date_start, select_date_end) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await diaryDao.selectDistinctFromDate(connection, user_id, select_date_start, select_date_end);
  connection.release();

  return result;
};