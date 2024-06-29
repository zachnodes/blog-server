require('dotenv').config()
const port = process.env.PORT
const uri = process.env.MONGO_URI

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const articleRoute = require('./routes/postsroute')
const authRoute = require('./routes/userroute')
const profileRoute = require('./routes/profileroute')
mongoose.set("strictQuery", false)


// express app
const app = express()

const corsOptions = {
    origin: process.env.ALLOWED_ORIGIN
}

app.use(cors(corsOptions))
app.use(express.json())
app.use('/articles', articleRoute)
app.use('/auth', authRoute)
app.use('/profile', profileRoute)

// db connection 
mongoose.connect(uri)
.then(() => {
    app.listen(port, () => {
        console.log(`connected to DB and listening for requests on ${port}`)
    })
})
.catch((error) => {
    console.log(error)
})