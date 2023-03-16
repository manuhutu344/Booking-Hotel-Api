const router = require('express').Router()
const User = require('../models/User')

router.post('/register', (req, res)=>{
    const {name, email, password} = req.body
    User.create({
        name, 
        email,
        password,
    })
    res.json({name, email, password})
})

module.exports = router