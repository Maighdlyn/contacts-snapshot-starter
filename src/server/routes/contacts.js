// var initRequires = require('.');
// Submit PR to remove line 1 from goal provided code
const dbContacts = require('../../db/contacts')
const {renderError} = require('../utils')

const router = require('express').Router()

// router.get('/new', (request, response) => {
//   response.render('new')
// })

// router.post('/', (request, response, next) => {
//   dbContacts.createContact(request.body)
//     .then(function(contact) {
//       if (contact) return response.redirect(`/contacts/${contact[0].id}`)
//       next()
//     })
//     .catch( error => renderError(error, response, response) )
// })

router.get('/:contactId', (request, response, next) => {
  const contactId = request.params.contactId
  if (!contactId || !/^\d+$/.test(contactId)) return next()
  dbContacts.getContact(contactId)
    .then(function(contact) {
      if (contact) return response.render('show', { contact })
      next()
    })
    .catch( error => renderError(error, response, response) )
})


// router.get('/:contactId/delete', (request, response, next) => {
//   const contactId = request.params.contactId
//   dbContacts.deleteContact(contactId)
//     .then(function(contact) {
//       if (contact) return response.redirect('/')
//       next()
//     })
//     .catch( error => renderError(error, response, response) )
// })

router.get('/search', (request, response, next) => {
  const query = request.query.q
  dbContacts.searchForContact(query)
    .then(function(contacts) {
      if (contacts) return response.render('index', { query, contacts })
      next()
    })
    .catch( error => renderError(error, response, response) )
})

module.exports = router
