const express = require('express')
const exphbs = require('express-handlebars')
const router = express.Router()
const bodyParser = require('body-parser')
const routes = require('./routes')
const port = 3000

const app = express()
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http:localhost:${port}`)
})
