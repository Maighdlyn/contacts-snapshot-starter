const db = require('./db')

const getUserInfo = function(username){
  return db.one(`SELECT * FROM users WHERE username=$1`, [username])
    .catch(error => error);
}

const getUserRole = function(id){
  return db.one(`SELECT role FROM users WHERE id=$1`, [id])
    .catch(error => error);
}

const createUser = function(username, password){
  return db.query(`
    INSERT INTO
      users (username, password)
    VALUES
      ($1, $2)
    RETURNING
      id
    `,
    [username, password])
    .catch(error => error);
}

module.exports = {
  getUserInfo,
  getUserRole,
  createUser
}
