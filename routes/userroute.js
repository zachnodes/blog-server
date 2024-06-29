const express = require('express')
const router = express.Router()
const {registerUser, loginUser, } = require('../controllers/authctrl')
const {userPost} = require('../controllers/articlesctrl')
const {requireAuth} = require('../middleware/requireAuth')

// // Get profile articles
// router.use('/:id', requireAuth)
// router.get('/:id', userPost)

router.post('/register', registerUser)

router.post('/login', loginUser)


module.exports = router