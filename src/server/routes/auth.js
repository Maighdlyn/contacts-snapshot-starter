const dbUsers = require('../../db/db-users')
const {renderError} = require('../utils')

const router = require('express').Router()

router.get('/login', (request, response) => {
  response.render('login')
})

router.post('/login', (request, response) => {
  dbUsers.getPassword(request.body.username)
    .then(function(user) {
      if (user.password === request.body.password) return response.redirect(`/`)

    })
    .catch( error => renderError(error, response, response) )
})

module.exports = router
