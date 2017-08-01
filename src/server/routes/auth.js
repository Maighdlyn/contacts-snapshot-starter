const dbUsers = require('../../db/db-users')
const {renderError} = require('../utils')

const router = require('express').Router()

router.get('/login', (request, response) => {
  response.render('login')
})

router.post('/login', (request, response) => {
  dbUsers.getPassword(request.body.username)
    .then(function(user) {
      alert("Alert!")
      if (user.password === request.body.password) {
        response.redirect(`/`)
      }
      // else alert("Alert!")

    })
    .catch( error => renderError(error, response, response) )
})

module.exports = router
