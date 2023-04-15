const router = require('express').Router()
const imageDownloader = require('image-downloader')

router.post('/upload-by-link', async(req, res)=>{
    const {Link} = req.body
    const newName =  'photo' + Date.now() + '.jpg'
    await imageDownloader.image({
        url: Link,
        dest: __dirname + '/uploads/' +newName
    })
    res.json(newName)
})

module.exports = router