const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const diaryDao = require("./diaryDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveDiaryList = async function (userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  const diaryListResult = await diaryDao.selectDiary(connection, userId);
  connection.release();

  return diaryListResult;
};

exports.retrieveCreateDiary = async function (petId, userId, content, title, img_url_1, img_url_2, img_url_3, img_url_4, img_url_5) {
  const connection = await pool.getConnection(async (conn) => conn);
  const createDiaryResult = await diaryDao.insertIntoDiary(connection, petId, userId, content, title, img_url_1, img_url_2, img_url_3, img_url_4, img_url_5);
  connection.release();

  return createDiaryResult;
};