const user = require('../Controllers/UserController')
const express = require('express')
const passport = require('passport')
const isAuth = require('./IsAuth')
require('dotenv').config()

const router = express.Router()

router.post('/register', user.userRegister)
router.post('/login', passport.authenticate('local'), (req, res, next) => {
    console.log(req.user)
    return res.json(req.user)
})
router.get('/allusers', user.getAllUsers)
router.get('/:id/user', user.getUser)
router.put('/updateuser', user.userUpdate)
router.delete('/:id/deleteuser', user.userDelete)

router.post('/logout', (req, res, next) => {
    req.session.authenticated = false
    delete req.session.user
    req.session.destroy()
    return res.json('logged out')
})

// Google OAuth

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: `${process.env.FRONTEND}/`,
    session: true,
}))

router.get('/account', isAuth,  (req, res, next) => {
    return res.json(req.user) 
})

module.exports = router