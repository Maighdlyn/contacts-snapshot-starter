const db = require('./db')

const getUserInfo = function(username){
  return db.one(`SELECT id, password FROM users WHERE username=$1`, [username])
    .catch(error => error);
}

const createUser = function(username, password){
  return db.query(`
    INSERT INTO
      users (username, password)
    VALUES
      ($1, $2)
    RETURNING
      id, username
    `,
    [username, password])
    .catch(error => error);
}

module.exports = {
  getUserInfo,
  createUser
}
