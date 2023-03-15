require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const connectionStr = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PW}@cluster0.lqotuoo.mongodb.net/Booking?retryWrites=true&w=majority`
mongoose.connect(connectionStr, {useNewUrlparser: true})
.then(()=> console.log('Terkoneksi Ke DB gaes'))
.catch(() => console.log('Terjadi  Kesalahan'))

mongoose.connection.on('error', err =>{
    console.log(err)
})