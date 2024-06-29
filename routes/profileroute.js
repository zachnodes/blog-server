const express = require('express')
const router = express.Router()
const {userPost, deletePost} = require('../controllers/articlesctrl')
const {requireAuth} = require('../middleware/requireAuth')

// Get profile articles
router.use('/:id', requireAuth)
router.get('/:id', userPost)

// Delete articles
router.delete('/:id', deletePost)

module.exports = router