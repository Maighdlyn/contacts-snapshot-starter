const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const Simple = require('connect-pg-simple')(session)
const routes = require('./server/routes')
const app = express()

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use((request, response, next) => {
  response.locals.query = ''
  next()
})

const sessionOptions = {
  store: new Simple({
    conString: 'postgres://localhost:5432/contacts_development'
  }),
  name: 'session',
  resave: false,
  saveUninitialized: false,
  secret: 'you will never know',
  cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 } // 1 day
}

app.use( session(sessionOptions) )

app.use('/', routes)

app.use((request, response) => {
  response.render('not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
