const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const bycryptSalt = bcrypt.genSaltSync(10)

router.post('/register', async(req, res)=>{
    const {name, email, password} = req.body
    try {
    const userDoc = await User.create({
        name, 
        email,
        password:bcrypt.hashSync(password, bycryptSalt),
    })
    res.json(userDoc)
} catch (error) {
    res.status(422).json(error)
}
})

router.post('/login', async (req, res)=>{
    const {email, password} = req.body
    const userDoc = await User.findOne({email})
    if(userDoc){
        const passOK = bcrypt.compareSync(password, userDoc.password)
        if(passOK){
            res.json('password jadi')
        }else{
            res.status(400).json('password tidak jadi')
        }
    }else{
        res.json('tidak ditemukan')
    }
})

module.exports = router