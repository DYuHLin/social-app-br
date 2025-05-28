const asyncHandler = require('express-async-handler')
const likeModel = require('../models/likes')
const postModel = require('../models/posts')
const commentModel = require('../models/comments')
const imageModel = require('../models/images')

exports.getAllLikes = asyncHandler(async (req, res, next) => {
        const posts = await postModel.get()
        const images = await imageModel.getPost()
        const likes = await likeModel.getAllLikes()
        for(let i = 0; i < posts.length; i++){
            let imgs = images.filter((img) => {return img.post == posts[i].id})
            let postLikes = likes.filter((lke) => {return lke.post == posts[i].id})
            posts[i].images = imgs
            posts[i].likes = postLikes
        }
    
        const likePost = posts.filter((pst) => pst.likes.some((lke) => lke.liker == req.params.id))

        return res.json(likePost)
})

exports.getAllLikesComments = asyncHandler(async (req, res, next) => {
    const posts = await commentModel.getAll()
    const images = await imageModel.getPost()
    const likes = await likeModel.getAllLikes()
    for(let i = 0; i < posts.length; i++){
        let imgs = images.filter((img) => {return img.post == posts[i].id})
        let postLikes = likes.filter((lke) => {return lke.post == posts[i].id})
        posts[i].images = imgs
        posts[i].likes = postLikes
    }

    const likePost = posts.filter((pst) => pst.likes.some((lke) => lke.liker == req.params.id))

    return res.json(likePost)
})

exports.createPostLike = asyncHandler(async (req, res, next) => {
    const {post, comment, liker} = req.body
    const like = await likeModel.findPostLike(liker, post)

    if(like.length == 0){
        await likeModel.create(post, comment, liker)
        return res.json('liked')
    } else{
        await likeModel.deletePostLike(post, liker)
        return res.json('unlike')
    }
})

exports.createCommentLike = asyncHandler(async (req, res, next) => {
    const {post, comment, liker} = req.body
    const like = await likeModel.findCommentLike(liker, comment)

    if(like.length == 0){
        await likeModel.create(post, comment, liker)
        return res.json('liked')
    } else{
        await likeModel.deletecommentLike(comment, liker)
        return res.json('unlike')
    }
})

exports.getTheLikes = asyncHandler(async (req, res, next) => {
    const likes = await likeModel.getAllLikes()

    return res.json(likes)
})