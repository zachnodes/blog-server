const Post = require('../models/postschema')
const mongoose = require('mongoose')

// create blog post
const createPost = async (req, res) => {
    const {title, description, content} = req.body
    const user_id = req.user._id

    try {
        const createPost = await Post.create({title, description, content, user_id})
        res.status(200).json(createPost)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

}

// get blog posts specific to user
const userPost = async (req, res) => {
    
    const user_id = req.user._id
    try {
        const articles = await Post.find({user_id}).sort({createdAt: -1})
        res.status(200).json(articles)
    } catch (e) {
        res.status(400).json({e: e.message})
    }
}

// delete blog post
const deletePost = async (req, res) => {
    const {id} = req.params
    try {
        const articles = await Post.findByIdAndDelete(id)
        res.status(200).json(articles)
    } catch (e) {
        res.status(400).json({e: e.message})
    }
}

// update blog post
const updatePost = async (req, res) => {
    const {slug} = req.params
    try {
        const update = await Post.findOneAndUpdate({slug: slug}, {...req.body}, {new: true})
        res.status(200).json(update)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
}


// get all posts and preview them
const getPost = async (req, res) => {
    try {
        const articles = await Post.find({}).sort({createdAt: -1})
        res.status(200).json(articles)
    } catch (e) {
        res.status(400).json({e: e.message})
    }
}

// get single post for viewing
const getSinglePost = async (req, res) => {
    const {slug} = req.params
    try {
        const singlePost = await Post.findOne({slug: slug})
        res.status(200).json(singlePost)

    } catch (e) {
        res.status(400).json({e: e.message})
    }
}

module.exports = {
    createPost,
    getPost,
    getSinglePost,
    userPost,
    deletePost, 
    updatePost
}
