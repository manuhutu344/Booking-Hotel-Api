const express = require('express')
const cors = require('cors')
const imageDownloader = require('image-downloader')
const userRouter = require('./router/userRouter')
const postRouter = require('./router/postRouter')
const CookieParser = require('cookie-parser')
require('dotenv').config()
require('./connection')
const app = express()

app.use(express.json())
app.use(CookieParser())
app.use('/upload', express.static(__dirname+'/upload'))
app.use(cors({credentials:true, origin:' http://localhost:5173'}))
app.use('/user', userRouter)
app.use('/post', postRouter)

app.post('/upload-by-link', async(req, res)=>{
    const {Link} = req.body
    const newName =  'photo' + Date.now() + '.jpg'
    await imageDownloader.image({
        url: Link,
        dest: __dirname + '/upload/' +newName
    })
    res.json(newName)
})


app.listen(4000, ()=>{
    console.log('Server Jalan Coy')
})