const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const authRoutes = require('./routes/index')
const mongo = require('./db/connection')

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)

app.use('/', (req, res) => res.send('API RUNNING ON PORT 5000'))

function notFound(req, res, next) {
  res.status(404)
  const error = new Error('Not found - ' + req.originalUrl)
  next(error)
}

function errorHandler(err, req, res) {
  res.status(res.statusCode || 500)
  res.json({message: err.message,
    stack: err.stack})
}
app.use(notFound);
app.use(errorHandler);

mongo.then(() => console.log('mongo connected'))
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`****[ Server listening on port ${port} ]****`)
})