const cartModel = require('../Models/cartModel')
const userModel = require('../Models/userModel')
const orderModel = require('../Models/orderModel')
const cartService = require('../Services/cartService')
const ApiError = require('../error/ApiError')

class OrderService{
    async create (user_id) {
        const cart = await cartService.getAllCartElements(user_id)
        if(!cart.items.length){
            throw ApiError.BadRequest('No items in a cart')
        }
        const order = await orderModel.create({
            user_id: user_id,
            items: cart.items,
            subTotal: cart.subTotal
        })
        cart.items = []
        cart.subTotal = 0
        await cart.save()
        return order
    }
    async declineOrder(order_id) {
        await orderModel.findByIdAndDelete(order_id);

        return 'Order is declined!';
    }
    async getOrders(){
        return orderModel.find().sort({orderDateObject: -1})

    }
}
module.exports = new OrderService()