const follow = require('../Controllers/FollowerController')
const express = require('express')

const router = express.Router()

router.post('/create', follow.addFollow)
router.get('/:id/followers', follow.getUserfollowers)
router.get('/:id/following', follow.getUserFollowing)

module.exports = router