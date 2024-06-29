const express = require('express')
const router = express.Router()
const { createPost, getPost, getSinglePost, updatePost} = require('../controllers/articlesctrl')
const {requireAuth} = require('../middleware/requireAuth')

// Require Authentication to create posts
router.use('/new', requireAuth)
router.post('/new', createPost)

// Get all articles
router.get('/', getPost)

// Get single article
router.get('/:slug', getSinglePost)

router.patch('/edit/:slug', updatePost)




module.exports = router