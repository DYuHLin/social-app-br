const likes = require('../Controllers/LikeController')
const express = require('express')

const router = express.Router()

router.post('/likepost', likes.createPostLike)
router.post('/likecomment', likes.createCommentLike)
router.get('/:id/allposts', likes.getAllLikes)
router.get('/:id/allcomments', likes.getAllLikesComments)
router.get('/likes', likes.getTheLikes)

module.exports = router