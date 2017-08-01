const dbUsers = require('../../db/db-users')
const {renderError} = require('../utils')

const router = require('express').Router()

router.get('/login', (request, response) => {
  response.render('login', {warning: ''})
})

router.post('/login', (request, response) => {
  dbUsers.getPassword(request.body.username)
    .then(function(user) {
      if (user.password === request.body.password) {
        response.redirect(`/`)
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
      .then(response.redirect(`/`) )
      .catch( error => renderError(error, response, response) )
  }
  else response.render('signup', {warning: 'password confirmation does not match'})
})

module.exports = router
