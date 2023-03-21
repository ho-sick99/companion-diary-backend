const mysql = require('mysql2/promise');

// 이미지 리스트 조회
const selectImageUrls = async (connection) => {
  return (await connection.query(`
  SELECT post_img.post_id, post_img.img_url
  FROM post, post_img
  WHERE post.post_id = post_img.post_id;`))[0]; // 이미지 리스트 반환 sql
}

// 게시글:이미지 = 1:N 매핑 (dp 사용)
// 게시글 리스트에 적용
const postListImgMapping = (posts, imgs) => {
  let arr = Array.from({ length: posts.length }, () => []); // 마지막 게시글의 post_id 개수 만큼의 빈 배열 생성
  for (let i = 0; i < imgs.length; i++) {
    arr[imgs[i].post_id - 1].push(imgs[i].img_url);
  }
  for (let i = 0; i < posts.length; i++) {
    posts[i].img_url = arr[posts[i].post_id - 1];
  }
  return posts;
}

// 게시글:이미지 = 1:N 매핑
// 게시글에 적용
const postImgMapping = (post, imgs) => {
  post.img_url = []
  for (let i = 0; i < imgs.length; i++) {
    if (imgs[i].post_id == post.post_id) {
      post.img_url.push(imgs[i].img_url);
    }
  }
  return post;
}

// 게시글 조회 sql
const get_post_list_sql = {
  // 질문글 리스트 조회 sql
  question_list_sql: (pet_tag) => {
    return mysql.format(`
      SELECT post.*, pet.pet_species, pet.pet_profile_img, user.user_nickname, post_title.post_title 
      FROM post, user, pet, post_title 
      WHERE post.user_id = user.user_id 
      and post.pet_id = pet.pet_id
      and post_title.post_id = post.post_id
      and post_type = 'QUESTION'
      and pet.pet_tag=?;`,
      [pet_tag]);
  },
  // 자랑글 리스트 조회 sql
  boast_list_sql: (pet_tag) => {
    return mysql.format(`
      SELECT post.*, pet.pet_species, pet.pet_profile_img, user.user_nickname 
      FROM post, user, pet 
      WHERE post.user_id = user.user_id 
      and post.pet_id = pet.pet_id
      and post_type = 'BOAST'
      and pet.pet_tag=?;`,
      [pet_tag]);
  },
}

const get_post_sql = {
  question_sql: (post_id) => {
    return mysql.format(`
      SELECT post.*, user.user_nickname, post_title.post_title
      FROM post, user, pet, post_title 
      WHERE post.user_id = user.user_id 
      and post.pet_id = pet.pet_id
      and post_title.post_id = post.post_id
      and post_type = 'QUESTION'
      and post.post_id=?;`,
      [post_id]);
  },
  boast_sql: (post_id) => {
    return mysql.format(`
      SELECT post.*, user.user_nickname 
      FROM post, user, pet
      WHERE post.user_id = user.user_id 
      and post.pet_id = pet.pet_id
      and post_type = 'BOAST'
      and post.post_id=?;`,
      [post_id]);
  }
}

// 게시글 리스트 조회
const selectPostList = async (connection, post_type, pet_tag) => {
  let post_sql = null;
  if (post_type == "QUESTION") { // 질문글
    post_sql = get_post_list_sql.question_list_sql(pet_tag);
  } else if (post_type == "BOAST") { // 자랑글
    post_sql = get_post_list_sql.boast_list_sql(pet_tag);
  }
  const posts = (await connection.query(post_sql))[0]; // 게시글 리스트
  const imgs = await selectImageUrls(connection); // 이미지 리스트
  const contents = postListImgMapping(posts, imgs); // 게시글, 이미지 매핑
  return contents; // 게시글 리스트 반환
}

// 게시글 조회
const selectPost = async (connection, post_type, post_id) => {
  let post_sql = null;
  if (post_type == "QUESTION") { // 질문글
    post_sql = get_post_sql.question_sql(post_id);
  } else if (post_type == "BOAST") { // 자랑글
    post_sql = get_post_sql.boast_sql(post_id);
  }
  const post = (await connection.query(post_sql))[0][0]; // 게시글
  const imgs = await selectImageUrls(connection); // 이미지 리스트
  const contents = postImgMapping(post, imgs); // 게시글, 이미지 매핑
  return contents; // 게시글 반환
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

const insert_post_sql = {
  // 게시글 삽입 sql
  post_sql: (post_id, params) => {
    return mysql.format(`
    INSERT INTO post 
    (post_id, pet_id, user_id, post_type, post_content) 
    VALUES (?, ?, ?, ?, ?); `,
      [post_id, params.pet_id, params.user_id, params.post_type, params.post_content]);
  },
  // 게시글 제목 삽입 sql
  post_title_sql: (post_id, post_title) => {
    return mysql.format(`
    INSERT INTO post_title 
    (post_id, post_title) 
    VALUES (?, ?);`,
      [post_id, post_title]);

  }
}

// 게시글 생성
const createPost = async (connection, params) => {
  const post_id = await getLastPostId(connection); // 생성할 게시글 id
  let post_sql = insert_post_sql.post_sql(post_id, params);
  if (params.post_type == "QUESTION") { // 질문글의 경우
    post_sql += insert_post_sql.post_title_sql(post_id, params.post_title); // 게시글 제목 삽입 sql문 추가
  }
  const imagesPath = params.imagesPath; // 이미지들이 저장된 경로
  let post_img_sql = ""; // 이미지 경로 삽입 sql
  if (imagesPath) { // 이미지가 존재할 경우
    imagesPath.map((img_url) => {
      post_img_sql += mysql.format(`
      INSERT INTO post_img (post_id, img_url) VALUES (?, ?);`, // 쿼리문 생성
        [post_id, img_url]);
    });
  }

  const Rows = await connection.query(post_sql + post_img_sql);

  return Rows[0][0];
}

module.exports = {
  selectPostList,
  selectPost,
  createPost,
};