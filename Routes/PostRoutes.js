const post = require('../Controllers/PostController')
const express = require('express')

const router = express.Router()

router.post('/create', post.createPost)
router.get('/allposts', post.getAllPosts)
router.get('/:id/post', post.getPost)
router.put('/:id/updatepost', post.updatePost)
router.delete('/:id/deletepost', post.deletePost)

module.exports = router