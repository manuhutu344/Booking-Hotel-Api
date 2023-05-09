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
            title, address, photos:addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests
        })
        res.json(placeDoc)
    })
})

router.get('/akomodasi', (req, res)=>{
    const {token} = req.cookies
    jwt.verify(token, jwtSecret, {}, async(err, userData)=>{
        const {id} = userData
        res.json( await Place.find({owner:id}) )
    })
})

router.get('/lihat/:id', async(req, res)=>{
    const {id} = req.params
    res.json(await Place.findById(id))
})

router.put('/update', async(req, res)=>{
    const {token} = req.cookies
    const{id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests} = req.body
    jwt.verify(token, jwtSecret, {}, async(err, userData)=>{
        if(err) throw err
        const PlaceDoc = await Place.findById(id)
       if(userData.id === PlaceDoc.owner.toString()){
           PlaceDoc.set({
           title, address, 
           photos:addedPhotos, description, 
           perks, extraInfo, checkIn, 
           checkOut, maxGuests
            })
           await PlaceDoc.save()
            res.json('aman')
        }
    })
})

router.get('/data', async(req, res)=>{
    res.json(await Place.find())
})

module.exports = router