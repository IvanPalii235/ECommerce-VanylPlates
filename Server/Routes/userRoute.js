const Router = require('express').Router
const userRouter = new Router()
const userController = require('../Controllers/userController')
const authMiddleware = require('../Middleware/authMiddleware')
const {body} = require('express-validator')

userRouter.post('/signup',
    body('name').isLength({min: 1, max: 20}),
    body('forName').isLength({min: 1, max: 20}),
    body('email').isEmail(),
    body('password').isLength({min: 4, max: 20}),
    userController.registration)
userRouter.post("/login", userController.login)
userRouter.post("/logout", userController.logout)
userRouter.get("/refresh", userController.refresh)
userRouter.get('/cart', authMiddleware, userController.getCart)

module.exports = userRouter
