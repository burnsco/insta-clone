const express = require('express')
const Joi = require('@hapi/joi')
const db = require('../db/connection')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const users = db.get('users')
const posts = db.get('posts')
users.createIndex('username', { unique: true })

const schema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  confirmPassword: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  email: Joi.string().email({ minDomainSegments: 2 })
})

function createTokenSendResponse(user, res, next) {
  const payload = {
    _id: user._id,
    username: user.username
  }
  jwt.sign(payload, 'shhhh', {
    expiresIn: '1d'
  }, (err, token) => {
    if (err) {
      res.status(422)
      const error = new Error('token cannot be created')
      next(error)
    } else {
      res.json(token)
    }
  })
}

router.post('/posts', (req, res) => {
  const newPost = {
    ...req.body,
  }
  posts.insert(newPost)
  console.log(newPost)
  res.json({message: 'posts route'})
})

router.get('/getPosts', (req, res) => {
  posts.find().then(post => {
    res.json(post)
  })
})

router.post('/signup', (req, res, next) => {
  const result = Joi.validate(req.body, schema)
  if (result.error === null) {
    users.findOne({
      username: req.body.username
    }).then(user => {
      if (user) {
        const error = new Error('that username already exists')
        res.status(409)
        next(error)
      } else {
        bcrypt.hash(req.body.password, 12).then(hashedPassword => {
          const newUser = {
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
          }
          users.insert(newUser).then(insertedUser => {
            console.log(insertedUser);
            res.json(insertedUser);
          })
        })
      }
    })
  } else {
    // give error 
    res.status(422)
    console.log('wrong format')
  }
})

router.post('/login', (req, res, next) => {
  users.findOne({
    username: req.body.username
  }).then(user => {
    console.log(user)
    if (user) {
      bcrypt
        .compare(req.body.password, user.password)
        .then(result => {
          if (result) {
            console.log(result)
            createTokenSendResponse(user, res, next)
          } else {
            res.status(422)
            const error = new Error('incorrect pass')
            next(error)
          }
        })
    } else {
      res.status(422)
      const error = new Error('username not found')
      next(error)
    }
  })
})

module.exports = router