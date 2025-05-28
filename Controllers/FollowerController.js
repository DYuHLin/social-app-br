const asyncHandler = require('express-async-handler')
const followerModel = require('../models/followers')
const notificationModel = require('../models/notifications')

exports.getUserfollowers = asyncHandler(async (req, res, next) => {
    const posts = await followerModel.getFollower(req.params.id)
    return res.json(posts)
})

exports.getUserFollowing = asyncHandler(async (req, res, next) => {
    const post = await followerModel.getFollowing(req.params.id)
    return res.json(post)
})

exports.addFollow = asyncHandler(async (req, res, next) => {
    const {follower, following} = req.body
    const follow = await followerModel.findFollowing(follower, following)
    if(follow.length == 0){
        await followerModel.create(follower, following)
        await notificationModel.create(follower, following)
        return res.json('added')
    } else {
        await followerModel.delete(follower, following)
        return res.json('removed')
    }
})