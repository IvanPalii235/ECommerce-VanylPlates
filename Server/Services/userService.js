const bcrypt = require('bcrypt')
const uuid = require('uuid')
const ApiError = require('../Error/apiError')
const userModel = require('../Models/userModel')
const UserDto = require('../dto/userDto')
const tokenService = require('../Services/tokenService')
const cartService = require('./cartService')
const cartModel = require('../Models/cartModel')

class UserService {
    async registration(name, forName, email, password, role) {
        const candidate = await userModel.findOne({email})
        if(candidate) {
            throw ApiError.BadRequest(`User with such email ${email} already exist`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const cart = await cartService.create()
        const user = await userModel.create({name, forName, email, password: hashPassword, role, cart_id: cart.id })

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto._id, tokens.refreshToken)
        return {tokens, user: userDto}
    }
    async login (email, password){
        const user = await userModel.findOne({email})
        if(!user){
            throw ApiError.BadRequest(`No user found`)
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            throw ApiError.BadRequest(`Incorrect password`)
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto._id, tokens.refreshToken)
        return {tokens, user: userDto}
    }
    async logout (refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }
    async refresh(refreshToken) {
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDB){
            throw ApiError.BadRequest('User unauthorized')
        }
        const user = await userModel.findById(userData._id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto._id, tokens.refreshToken);
        return{tokens, user:userDto};
    }
    async getCart(user_id)
    {
        const user = await userModel.findById(user_id)
        const cart = await cartModel.findById(user.cart_id)
        return {user, cart}
    }
}

module.exports = new UserService()