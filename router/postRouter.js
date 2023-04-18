const router = require('express').Router()
const multer = require('multer')

const photosMiddleware = multer({dest:'upload/'})
router.post('/upload', photosMiddleware.array('photos', 100),(req, res)=>{
    console.log(req.files)
    res.json(res.files)
})

module.exports = router