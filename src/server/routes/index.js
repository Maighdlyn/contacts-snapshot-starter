const router = require('express').Router();
const contacts = require('./contacts')
const auth = require('./auth')
const dbContacts = require('../../db/contacts');
const dbUsers = require('../../db/users')


router.use('/auth', auth)

const ensureLoggedIn = (request, response, next) => {
  if (request.session.user) {
    next()
  } else {
    response.redirect('/auth/login')
  }
}

router.use(ensureLoggedIn)

router.get('/', (request, response) => {
  dbContacts.getContacts()
    .then( contacts => response.render( 'index', { contacts }) )
    .catch( err => console.log('err', err) )
})

router.use('/contacts', contacts)

module.exports = router;
