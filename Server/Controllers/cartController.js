const cartService = require('../Services/cartService');

class CartController {
    async addElementToCart (req, res, next)
    {
        try{
            const {userId, productId} = req.body
            const cartData = await cartService.addToCart(userId, productId)
            return res.status(200).json(cartData)
        }catch (e) {
            next(e)
        }
    }
    async getAll (req, res, next)
    {
        try{
            const {id} = req.params
            const cartData = await cartService.getAllCartElements(id)
            return res.status(200).json(cartData)
        }catch (e) {
            next(e)
        }
    }
    async deleteElementFromCart (req, res, next)
    {
        try{
            const {userId, productId} = req.query

            const cartData = await cartService.deleteCartElement(userId, productId)
            return res.status(200).json(cartData)
        }catch (e) {
            next(e)
        }
    }
}
module.exports = new CartController()