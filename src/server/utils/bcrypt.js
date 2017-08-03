const bcrypt = require('bcrypt')
const salt = 11

const encryptPassword = (password) => {
  return bcrypt.hash(password, salt)
}

const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash)
}

module.exports = {encryptPassword, comparePasswords}
