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
} catch (e) {
    res.status(422).json(e)
}
})

module.exports = router