const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");

const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveUserIdWithEmail = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userListResult = await userDao.selectUserIdWhereEmail(connection, email);
  connection.release();

  return userListResult;
};

exports.joinUser = async function (email, nickname, profile_image) {
  const connection = await pool.getConnection(async (conn) => conn);
  const joinUserResult = await userDao.insertIntoUser(connection, email, nickname, profile_image);
  connection.release();

  return joinUserResult;
}

exports.retrieveUser = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userResult = await userDao.selectUserIdx(connection, userIdx);

  connection.release();

  return userResult[0];
};

exports.emailCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  connection.release();

  return emailCheckResult;
};

exports.passwordCheck = async function (selectUserPasswordParams) {
  const connection = await pool.getConnection(async (conn) => conn);
  const passwordCheckResult = await userDao.selectUserPassword(
      connection,
      selectUserPasswordParams
  );
  connection.release();

  return passwordCheckResult[0];
};

exports.accountCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const userAccountResult = await userDao.selectUserAccount(connection, email);
  connection.release();

  return userAccountResult;
};