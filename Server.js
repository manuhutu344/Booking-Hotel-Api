const express = require('express')
const cors = require('cors')
const userRouter = require('./router/userRouter')
const CookieParser = require('cookie-parser')
const postRouter = require('./router/postRouter')
require('dotenv').config()
require('./connection')
const app = express()

app.use(express.json())
app.use(CookieParser())
app.use(cors({credentials:true, origin:' http://localhost:5173'}))
app.use('/user', userRouter)
app.use('/post', postRouter)


app.listen(4000, ()=>{
    console.log('Server Jalan Coy')
})