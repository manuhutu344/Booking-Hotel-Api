const router = require('express').Router()
const multer = require('multer')
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

module.exports = router