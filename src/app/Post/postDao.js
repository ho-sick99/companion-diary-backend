const mysql = require('mysql2/promise');

// 이미지 리스트 조회
const selectImageUrls = async (connection) => {
  // 이미지 조회 sql
  const imgs = (await connection.query(`
  SELECT post_img.post_id, post_img.img_url
  FROM post, post_img
  WHERE post.post_id = post_img.post_id;`))[0]; // 이미지 리스트 반환
}

// 질문글 리스트 조회
const selectQuestionPostList = async (connection, pet_tag) => {
  // 질문글 조회 sql
  const content_sql = mysql.format(`
    SELECT post.*, pet.pet_species, pet.pet_profile_img, user.user_nickname, post_title.post_title 
    FROM post, user, pet, post_title 
    WHERE post.user_id = user.user_id 
    and post.pet_id = pet.pet_id
    and post_title.post_id = post.post_id
    and post_type = 'QUESTION'
    and pet.pet_tag=?;`,
    [pet_tag]);



  const contents = (await connection.query(content_sql))[0]; // 질문글 리스트

  // 질문글:이미지 = 1:N 매핑 (dp 사용)
  let arr = Array.from({ length: contents.length }, () => []); // 마지막 게시글의 post_id 개수 만큼의 빈 배열 생성
  for (let i = 0; i < imgs.length; i++) {
    arr[imgs[i].post_id - 1].push(imgs[i].img_url);
  }
  for (let i = 0; i < contents.length; i++) {
    contents[i].img_url = arr[contents[i].post_id - 1];
  }

  return contents;
}

// 자랑글 리스트 조회
const selectBoastPostList = async (connection, pet_tag) => {
  const query = mysql.format(`
    SELECT post.*, pet.pet_species, pet.pet_profile_img, user.user_nickname 
    FROM post, user, pet 
    WHERE post.user_id = user.user_id 
    and post.pet_id = pet.pet_id
    and post_type = 'BOAST'
    and pet.pet_tag=?;`,
    [pet_tag]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 질문글 조회
const selectQuestionPost = async (connection, post_id) => {
  const query = mysql.format(`
    SELECT post.*, user.user_nickname, post_title.post_title
    FROM post, user, pet, post_title 
    WHERE post.user_id = user.user_id 
    and post.pet_id = pet.pet_id
    and post_title.post_id = post.post_id
    and post_type = 'QUESTION'
    and post.post_id=?;`,
    [post_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 자랑글 조회
const selectBoastPost = async (connection, post_id) => {
  const query = mysql.format(`
    SELECT post.*, user.user_nickname 
    FROM post, user, pet
    WHERE post.user_id = user.user_id 
    and post.pet_id = pet.pet_id
    and post_type = 'BOAST'
    and post.post_id=?;`,
    [post_id]);
  const Rows = await connection.query(query);

  return Rows[0];
}

// 생성할 게시글 id 반환 메서드
const getLastPostId = async (connection) => {
  let post_id = (await connection.query(
    `SELECT MAX(post_id)+1 FROM post;`
  ))[0][0]['MAX(post_id)+1']; // 가장 최신 게시글 id + 1 = 현재 작성할 게시글 id
  if (post_id == null) {
    post_id = 1; // 작성된 게시글이 없을 경우의 초기 게시글 식별자 = 1
  }
  return post_id;
}

// 질문글 생성
const createQustionPost = async (connection, params) => {
  const post_id = await getLastPostId(connection); // 생성할 게시글 id
  // 게시글 삽입 sql
  const post_sql = mysql.format(`
      INSERT INTO post (post_id, pet_id, user_id, post_type, post_content) VALUES (?, ?, ?, ?, ?); `,
    [post_id, params.pet_id, params.user_id, params.post_type, params.post_content]);
  // 게시글 제목 삽입 sql
  const post_title_sql = mysql.format(`
      INSERT INTO post_title (post_id, post_title) VALUES (?, ?);`,
    [post_id, params.post_title]);

  const imagesPath = params.imagesPath; // 이미지들이 저장된 경로
  let post_img_sql = ""; // 이미지 경로 삽입 sql
  if (imagesPath) { // 이미지가 존재할 경우
    imagesPath.map((img_url) => {
      post_img_sql += mysql.format(`
      INSERT INTO post_img (post_id, img_url) VALUES (?, ?);`, // 쿼리문 생성
        [post_id, img_url]);
    });
  }
  console.log(post_img_sql)
  const Rows = await connection.query(post_sql + post_title_sql + post_img_sql);

  return Rows[0];
}

// 자랑글 생성
const createBoastPost = async (connection, params) => {
  // 게시글 삽입 sql
  const post_sql = mysql.format(`
      INSERT INTO post (pet_id, user_id, post_type, post_content) VALUES (?, ?, ?, ?); `,
    [params.pet_id, params.user_id, params.post_type, params.post_content]);

  const Rows = await connection.query(post_sql);

  return Rows[0];
}

module.exports = {
  selectQuestionPostList,
  selectBoastPostList,
  selectQuestionPost,
  selectBoastPost,
  createQustionPost,
  createBoastPost
};