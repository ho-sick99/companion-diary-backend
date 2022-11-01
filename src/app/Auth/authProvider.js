const { pool } = require("../../../config/database");
const authDao = require("./authDao");

// Provider: Read 비즈니스 로직 처리

exports.retrieveUserIdWithEmail = async function (user_email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await authDao.selectUserIdWhereEmail(connection, user_email);
  connection.release();

  return result;
};

exports.joinUser = async function (user_email, user_nickname, user_profile_img) {
    const connection = await pool.getConnection(async (conn) => conn);
    const result = await authDao.insertIntoUser(connection, user_email, user_nickname, user_profile_img);
    connection.release();
  
    return result;
};