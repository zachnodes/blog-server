const User = require('../models/userschema')
const jwt = require('jsonwebtoken')

// sign token
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '2h'})
}

// Register User
const registerUser = async (req, res) => {
    const {username, email, password, confirm} = req.body
  

    try {

        const user = await User.signup(username, email, password, confirm)
        // Create JWT
        const token = createToken(user._id)
        res.status(200).json({username, token, userID: user._id})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Login User
const loginUser = async (req, res) => {
    const {username, password} = req.body

    try {
        const user = await User.login(username, password)
        // Create JWT
        const token = createToken(user._id)
        res.status(200).json({username, token, userID: user._id})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    registerUser,
    loginUser
}