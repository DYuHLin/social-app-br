const asyncHandler = require('express-async-handler')
const imageModel = require('../models/images')

exports.getImagePosts = asyncHandler(async (req, res, next) => {
    const posts = await imageModel.getPost()
    return res.json(posts)
})

exports.getImageComments = asyncHandler(async (req, res, next) => {
    const comments = await imageModel.getComments()
    return res.json(comments)
})

exports.createImage = asyncHandler(async (req, res, next) => {
    const {image, post, comment} = req.body

    await imageModel.create(image, post, comment)
    return res.json('created')
})

exports.deletePostImage = asyncHandler(async (req, res, next) => {
    await imageModel.deletePostImages(req.params.id)
    return res.json('deleted')
})

exports.deleteCommentImage = asyncHandler(async (req, res, next) => {
    await imageModel.deleteCommentImages(req.params.id)
    return res.json('deleted')
})