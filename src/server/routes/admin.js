const dbContacts = require('../../db/contacts')
const {renderError} = require('../utils')

const router = require('express').Router()

router.get('/new', (request, response) => {
  response.render('new')
})

router.post('/', (request, response, next) => {
  dbContacts.createContact(request.body)
    .then(function(contact) {
      if (contact) return response.redirect(`/contacts/${contact[0].id}`)
      next()
    })
    .catch( error => renderError(error, response, response) )
})

router.get('/delete/:contactId', (request, response, next) => {
  const contactId = request.params.contactId
  dbContacts.deleteContact(contactId)
    .then(function(contact) {
      if (contact) return response.redirect('/')
      next()
    })
    .catch( error => renderError(error, response, response) )
})

module.exports = router
