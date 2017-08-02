const bcrypt = require('bcrypt')
const salt = 11 //bcrypt.genSalt(11)

const encryptPassword = (password) => {
  return bcrypt.hash(password, salt)
}

const comparePasswords = (password, hash) => {
  return bcrypt.compare(password, hash)
}

// bcryptPassword
// bcrypt.hash(password, 11)
//   .then(password => {
//
//     bcryptPassword = password
//   })
//   .then( (res) => {
//     console.log('res:', res)
//     if (res) {
//       console.log('bcryptPassword', bcryptPassword)
//       dbUsers.createUser(username, bcryptPassword)
//         .then( userData => {
//           createUserSession(request, response, userData)
//         })
//         .catch( error => renderError(error, response, response) )
//     }
//     else response.render('signup', {warning: 'password confirmation does not match'})
//     })
//
// const b = 'be cryptic'

module.exports = {encryptPassword, comparePasswords}
