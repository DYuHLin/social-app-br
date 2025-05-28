const image = require('../Controllers/ImageController')
const express = require('express')

const router = express.Router()

router.get('/postimage', image.getImagePosts)
router.get('/commentimage', image.getImageComments)
router.post('/create', image.createImage)
router.delete('/:id/deletepostimage', image.deletePostImage)
router.delete('/:id/deletecommentimage', image.deleteCommentImage)

module.exports = router