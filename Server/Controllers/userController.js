const userService = require('../Services/userService')
const ApiError = require('../Error/apiError')
const {validationResult, cookie} = require('express-validator')

class UserController{
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const {name, forName, email, password} = req.body
            const userData = await userService.registration(name, forName, email, password)

            res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.status(200).json(userData)
        }catch (e) {
            next(e)
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.status(200).json(userData)
        }catch (e) {
            next(e)
        }
    }
    async logout (req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.status(200).json(token)
        }catch (e) {
            next(e)
        }
    }
    async refresh(req, res, next) {
        try{
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: 10 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(userData)
        }catch (e) {
            next(e)
        }
    }
    async getCart(req, res, next){
        try{
            const {user_id} = req.body;
            const cart = await userService.getCart(user_id);
            return res.status(200).json(cart);
        }catch (e){
            next(e);
        }
    }
}
module.exports = new UserController()