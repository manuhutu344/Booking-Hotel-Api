const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = '!@#$%^&*_-+=qwertyuiopasdfghjklzxcvbnm1234567890:;<>?'

router.post('/register', async(req, res)=>{
    const {name, email, password} = req.body
    try {
        const userDoc = await User.create({
          name,
          email,
          password:bcrypt.hashSync(password, bcryptSalt),
        })
        res.json(userDoc)
      } catch (e) {
        res.status(422).json(e)
      }
})

router.post('/login', async (req, res)=>{
    const {email, password} = req.body
    const userDoc = await User.findOne({email})
    if(userDoc){
        const passOK = bcrypt.compareSync(password, userDoc.password)
        if(passOK){
            jwt.sign({email:userDoc.email, id:userDoc._id}, jwtSecret, {}, (err, token)=>{
                if(err) throw err
                res.cookie('token', token).json(userDoc)
            })
        }else{
            res.status(400).json('password tidak jadi')
        }
    }else{
        res.json('tidak ditemukan')
    }
})

router.get('/profile', (req, res)=>{
    const {token} = req.cookies
    res.json({token})
})

module.exports = router