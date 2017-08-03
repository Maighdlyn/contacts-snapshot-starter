const dbUsers = require('../../db/users')
const {renderError} = require('../utils/utils')
const {encryptPassword, comparePasswords} = require('../utils/bcrypt')
const router = require('express').Router()

createUserSession = (request, response, user) => {
  request.session.user = user
  response.redirect('/')
}

router.get('/login', (request, response) => {
  response.render('login', {warning: ''})
})

router.post('/login', (request, response) => {
  dbUsers.getUserInfo(request.body.username)
    .then( user => {
      comparePasswords(request.body.password, user.password)
        .then( result => {
          if (result) createUserSession(request, response, user)
          else response.render('login', {warning: 'Incorrect username or password'})
        })
    })
    .catch( error => renderError(error, response, response) )
})

router.get('/signup', (request, response) => {
  response.render('signup', {warning: ''})
})

router.post('/signup', (request, response) => {
  const username = request.body.username
  const password =  request.body.password

  if (password.length > 0 && password === request.body.confirmation) {
    encryptPassword(password)
      .then( (encryptedPassword) => {
        dbUsers.createUser(username, encryptedPassword)
          .then( userData => {
            createUserSession(request, response, userData)
          })
      })
      .catch( error => renderError(error, response, response) )
  }
  else response.render('signup', {warning: 'password confirmation does not match'})
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/auth/login')
})

module.exports = router
