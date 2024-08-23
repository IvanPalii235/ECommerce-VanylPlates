const Router = require('express').Router
const ratingRouter = new Router()
const ratingController = require('../Controllers/ratingController')
const authMiddleware = require('../Middleware/authMiddleware')

ratingRouter.post('/create', authMiddleware, ratingController.createRating)

module.exports = ratingRouter
