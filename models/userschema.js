const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const validator = require('validator')

const user = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

user.statics.signup = async function(username, email, password, confirm) {
    // validate user
    if (!username || !email || !password) {
        throw Error("All fields must be filled")
    }
    if (password !== confirm) {
        throw Error("Passwords do not match")
    }

    if (!validator.isEmail(email)) {
        throw Error("Not a valid email")
    }

    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough")
    }

    const isEmailUsed = await this.findOne({email})
    const isUsernameUsed = await this.findOne({username})

    if (isEmailUsed || isUsernameUsed) {
        throw Error("Email or Username are already taken")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const createdUser = await this.create({username, email, password: hash})

    return createdUser

}

user.statics.login = async function (username, password) {
    //
    if (!username || !password) {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({username})
    
    if (!user) {
        throw Error("Incorrect Username")
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if (!matchPassword) {
        throw Error("Incorrect Password")
    }

    return user


}

module.exports = mongoose.model('User', user )