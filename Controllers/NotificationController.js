const asyncHandler = require('express-async-handler')
const notificationModel = require('../models/notifications')

exports.getAllnotifications = asyncHandler(async (req, res, next) => {
    const notifications = await notificationModel.getNotifications(req.params.id)
    return res.json(notifications)
})

exports.createNotifications = asyncHandler(async (req, res, next) => {
    const {user, following} = req.body

    await notificationModel.create(user, following)
    return res.json('created')
})

exports.deleteNotifications = asyncHandler(async (req, res, next) => {
    await notificationModel.delete(req.params.id)
    return res.json('deleted')
})