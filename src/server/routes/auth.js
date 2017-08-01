const dbUsers = require('../../db/users')
const {renderError} = require('../utils')

const router = require('express').Router()

createUserSession = (request, user) => {
  request.session.user = user
}

router.get('/login', (request, response) => {
  response.render('login', {warning: ''})
})

router.post('/login', (request, response) => {
  dbUsers.getUserInfo(request.body.username)
    .then(function(user) {
      if (user.password === request.body.password) {
        createUserSession(request, request.body.username)
        response.redirect('/')
      }
      else response.render('login', {warning: 'Incorrect username or password'})

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
    dbUsers.createUser(username, password)
      .then( userData => {
        createUserSession(request, username)
        response.redirect('/')
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
