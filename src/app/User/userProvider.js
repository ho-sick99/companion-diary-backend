const { pool } = require("../../../config/database");
const userDao = require("./userDao");

// Provider: Read 비즈니스 로직 처리

exports.updateUserInfo = async function (user_nickname, user_profile_img, user_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await userDao.updateFromUser(connection, user_nickname, user_profile_img, user_id);
  connection.release();

  return result;
};

exports.getPetList = async function (user_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await userDao.selectUsersAllPetList(connection, user_id);
  connection.release();

  return result;
};

exports.addPet = async function (user_id, pet_tag, pet_name, pet_age, pet_species, pet_sex, pet_profile_img) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await userDao.insertIntoPet(connection, user_id, pet_tag, pet_name, pet_age, pet_species, pet_sex, pet_profile_img);
  connection.release();

  return result;
};

exports.retrievePetOwnerId = async function (pet_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await userDao.selectFromUserIdAtPet(connection, pet_id);
  connection.release();

  return result;
};

exports.modifyPet = async function (pet_tag, pet_name, pet_age, pet_species, pet_sex, pet_profile_img, pet_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await userDao.updateSetPet(connection, pet_tag, pet_name, pet_age, pet_species, pet_sex, pet_profile_img, pet_id);
  connection.release();

  return result;
};

exports.removePet = async function (pet_id) {
  const connection = await pool.getConnection(async (conn) => conn);
  const result = await userDao.deleteFromPet(connection, pet_id);
  connection.release();

  return result;
};
