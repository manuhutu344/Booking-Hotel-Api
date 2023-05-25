const mongoose = require('mongoose')

const bokingSchema = new mongoose.Schema({
    place: {type:mongoose.Schema.Types.ObjectId, required:true},
    checkIn: {type:Date, required:true},
    checkOut: {type:Date, required:true},
    name: {type:String, required:true},
    mobile: {type:String, required:true},
    price: String
})

const BokingModel = mongoose.model('Boking', bokingSchema)

module.exports = BokingModel