const asyncHandler = require('express-async-handler')
const commentModel = require('../models/comments')
const imageModel = require('../models/images')
const likesModel = require('../models/likes')

exports.getAllComments = asyncHandler(async (req, res, next) => {
    const posts = await commentModel.get(req.params.id)
    const images = await imageModel.getComments()
    const likes = await likesModel.getAllLikes()
    for(let i = 0; i < posts.length; i++){
        let imgs = images.filter((img) => {return img.comment == posts[i].id})
        let postLikes = likes.filter((lke) => {return lke.comment == posts[i].id})
        posts[i].images = imgs
        posts[i].likes = postLikes
    }

    return res.json(posts)
})

exports.getAllCommentsForUser = asyncHandler(async (req, res, next) => {
    const posts = await commentModel.getAll()
    const images = await imageModel.getComments()
    const likes = await likesModel.getAllLikes()
    for(let i = 0; i < posts.length; i++){
        let imgs = images.filter((img) => {return img.comment == posts[i].id})
        let postLikes = likes.filter((lke) => {return lke.comment == posts[i].id})
        posts[i].images = imgs
        posts[i].likes = postLikes
    }

    return res.json(posts)
})

exports.getAllCommentsComments = asyncHandler(async (req, res, next) => {
    const posts = await commentModel.getCC(req.params.id)
    const images = await imageModel.getComments()
    const likes = await likesModel.getAllLikes()
    for(let i = 0; i < posts.length; i++){
        let imgs = images.filter((img) => {return img.comment == posts[i].id})
        let postLikes = likes.filter((lke) => {return lke.comment == posts[i].id})
        posts[i].images = imgs
        posts[i].likes = postLikes
    }

    return res.json(posts)
})

exports.getComment = asyncHandler(async (req, res, next) => {
    const post = await commentModel.single(req.params.id)
    const images = await imageModel.getComments()
    const likes = await likesModel.getAllLikes()
    let imgs = images.filter((img) => {return img.comment == req.params.id})
    let postLikes = likes.filter((lke) => {return lke.comment == req.params.id})
    post[0].images = imgs
    post[0].likes = postLikes

    return res.json(post)
})

exports.createComment = asyncHandler(async (req, res, next) => {
    const {text, video, link, date, poster, post, youtube, comments} = req.body

    const comment = await commentModel.create(text, video, link, date, poster, post, youtube, comments)
    return res.json(comment)
})

exports.updateComment = asyncHandler(async (req, res, next) => {
    const {text, video, link, date, poster, post, youtube, comment} = req.body

    await commentModel.update(text, video, link, date, poster, post, youtube, comment, req.params.id)
    return res.json('updated')
})

exports.deleteComment = asyncHandler(async (req, res, next) => {
    await commentModel.delete(req.params.id)
    return res.json('deleted')
})