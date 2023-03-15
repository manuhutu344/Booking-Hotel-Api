const router = require('express').Router()

router.post('/register', (req, res)=>{
    const {name, email, password} = req.body
    res.json({name, email, password})
})

module.exports = router