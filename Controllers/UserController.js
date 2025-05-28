const asyncHandler = require('express-async-handler')
const userModel = require('../models/users')
const bcrypt = require('bcryptjs')
const token = require('./Token')
const followerModel = require('../models/followers')

exports.userRegister = asyncHandler(async (req, res, next) => {
    try{
        const user = await userModel.exist(req.body.username)
        if(user.length != 0){
            return res.json('username')
        } else {
            bcrypt.hash(req.body.password, 10, async (err, hashed) => {
                if(err){
                    console.log(err)
                    return next(err)
                } else {
                    newUser = await userModel.create(req.body.username, hashed, req.body.description, req.body.image)
                    return res.json('success')
                }
            })
        }
    } catch(err){
        console.log(err)
        next(err)
    }
})

exports.userLogin = asyncHandler(async (req, res, next) => {
    try{
        const user = await userModel.exist(req.body.username)
        if(user.length == 0){
            return res.json('username')
        } else{
            const match = await bcrypt.compare(req.body.password, user[0].password)
            if(!match){
                return res.json('password')
            }
            const accessToken = token.getAccessToken(user)
            const refreshToken = token.getRefreshToken(user)
            token.refreshTokens.push(refreshToken)
            req.session.authenticated= true
            req.session.user = user
            return res.json(req.session)
        }
    } catch(err){
        next(err)
    }
})

exports.userUpdate = asyncHandler(async (req, res, next) => {
    try{
        bcrypt.hash(req.body.password, 10, async (err, hashed) => {
            if(err){
                console.log(err)
                return next(err)
            } else {
                await userModel.update(req.body.username, hashed, req.body.description, req.body.image, req.body.id)
                req.session.authenticated = false
                delete req.session.user
                req.session.destroy()
                return res.json('success')
            }
            })
        
    } catch(err){
        next(err)
    }
})

exports.getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await userModel.get()
    const followers = await followerModel.getAll()
    for(let i = 0; i < users.length; i++){
        let follow = followers.filter((flw) => {return flw.following == users[i].id})
        users[i].followers = follow
    }
    return res.json(users)
})

exports.getUser = asyncHandler(async (req, res, next) => {
    const users = await userModel.single(req.params.id)
    const followers = await followerModel.getFollower(req.params.id)
    const following = await followerModel.getFollowing(req.params.id)
    users[0].followers = followers
    users[0].following = following
    return res.json(users)
})

exports.userDelete = asyncHandler(async (req, res, next) => {
    await userModel.delete(req.params.id)
    return res.json('deleted')
})