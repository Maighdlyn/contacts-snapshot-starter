const router = require('express').Router();
const contacts = require('./contacts')
const auth = require('./auth')
const admin = require('./admin')
const dbContacts = require('../../db/contacts');
const dbUsers = require('../../db/users')

router.use('/auth', auth)

const ensureLoggedIn = (request, response, next) => {
  if (request.session && request.session.user) {
    request.user = request.session.user
    next()
  } else {
    response.redirect('/auth/login')
  }
}

router.use(ensureLoggedIn)
router.use('/contacts', contacts)

router.get('/', (request, response) => {
  dbContacts.getContacts()
    .then( contacts => {
      response.render( 'index', {
        contacts,
        role: request.user.role
       })
    })
    .catch( err => console.log('err', err) )
})

const ensureAdmin = (request, response, next) => {
  dbUsers.getUserRole(request.session.userid)
    .then( userRole => {
      if (request.user.role === 'admin') {
        next()
      } else {
        response.status('403').render('not_authorized')
      }
    })
}

router.use(ensureAdmin)
router.use('/contacts', admin)

module.exports = router;
