const router = require('express').Router()
const multer = require('multer')
const Place = require('../models/Place')
const jwt = require('jsonwebtoken')
const jwtSecret = '!@#$%^&*_-+=qwertyuiopasdfghjklzxcvbnm1234567890:;<>?'
const fs = require('fs')

const photosMiddleware = multer({dest:'upload/'})
router.post('/upload', photosMiddleware.array('photos', 100),(req, res)=>{
    const uploadedFiles = []
    for(let i = 0; i < req.files.length; i++){
        const {path, originalname} = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace('upload',''))
    }
    res.json(uploadedFiles)
})

router.post('/place', (req, res)=>{
    const {token} = req.cookies
    const{title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests} = req.body
    jwt.verify(token, jwtSecret, {}, async(err, userData)=>{
        if(err) throw err
       const placeDoc = await Place.create({
            owner: userData.id, 
            title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests
        })
        res.json(placeDoc)
    })
})

module.exports = router