const mongoose = require('mongoose')
const slugify = require('slugify')
const marked = require('marked')
const createDOMPurify = require('dompurify')
const {JSDOM} = require('jsdom')
const dompurify = createDOMPurify( new JSDOM().window)

const Schema = mongoose.Schema

const postShema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    slug: {type: String, required: true, unique: true},
    user_id: {type: String, required: true},
})

postShema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    if (this.content) {
        dompurify.sanitize((this.content))
    }
    next()
})

module.exports = mongoose.model('Posts', postShema)