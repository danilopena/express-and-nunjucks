const express = require('express')
const njk = require('nunjucks')

const app = express()
const middleWare = (req, res, next) => {
  if (!req.query.age) {
    res.redirect('/')
  } else {
    return next()
  }
}

config()
makeRoutes()

function config () {
  njk.configure('views', {
    autoescape: true,
    express: app,
    watch: true
  })

  app.use(express.urlencoded({ extended: false }))
  app.set('view engine', 'njk')

  app.listen(3000)
}

function makeRoutes () {
  app.get('/', (req, res) => {
    return res.render('age-page')
  })

  app.post('/check', (req, res) => {
    return req.body.age > 18
      ? res.redirect(`/major?age=${req.body.age}`)
      : res.redirect(`/minor?age=${req.body.age}`)
  })

  app.get('/major', middleWare, (req, res) => {
    const age = req.query.age
    return res.render('major-page', { age })
  })

  app.get('/minor', middleWare, (req, res) => {
    const age = req.query.age
    return res.render('minor-page', { age })
  })
}
