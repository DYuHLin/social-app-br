const asyncHandler = require('express-async-handler')
const postModel = require('../models/posts')
const imageModel = require('../models/images')
const likesModel = require('../models/likes')

exports.getAllPosts = asyncHandler(async (req, res, next) => {
    const posts = await postModel.get()
    const images = await imageModel.getPost()
    const likes = await likesModel.getAllLikes()
    for(let i = 0; i < posts.length; i++){
        let imgs = images.filter((img) => {return img.post == posts[i].id})
        let postLikes = likes.filter((lke) => {return lke.post == posts[i].id})
        posts[i].images = imgs
        posts[i].likes = postLikes
    }

    return res.json(posts)
})

exports.getPost = asyncHandler(async (req, res, next) => {
    const post = await postModel.single(req.params.id)
    const images = await imageModel.getSinglePost(req.params.id)
    const likes = await likesModel.getAllLikes()

    post[0].images = images
    post[0].likes = likes.filter((like) => {return like.post == req.params.id})

    return res.json(post)
})

exports.createPost = asyncHandler(async (req, res, next) => {
    const {text, video, link, date, poster, youtube} = req.body

    const post = await postModel.create(text, video, link, date, poster, youtube)
    return res.json(post)
})

exports.updatePost = asyncHandler(async (req, res, next) => {
    const {text, video, link, date, poster, youtube} = req.body

    await postModel.update(text, video, link, date, poster, youtube, req.params.id)
    return res.json('updated')
})

exports.deletePost = asyncHandler(async (req, res, next) => {
    await postModel.delete(req.params.id)
    return res.json('deleted')
})