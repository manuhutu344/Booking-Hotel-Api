const express = require('express')
const cors = require('cors')
const userRouter = require('./router/userRouter')
const app = express()

app.use(express.json())
app.use(cors({credentials:true, origin:' http://127.0.0.1:5173'}))
app.use('/user', userRouter)


app.listen(4000, ()=>{
    console.log('Server Jalan Coy')
})