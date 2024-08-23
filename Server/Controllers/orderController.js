const orderService = require('../Services/orderService');
const ApiError = require('../Error/apiError');


module.exports = new class OrderController{
    async createOrder(req, res, next){
        try{
            const orderData = await orderService.create(req.userData._id);
            return res.status(200).json(orderData);
        }catch (e){
            next(e);
        }
    }
    async cancelOrder(req, res, next){
        try{
            const {id} = req.params;
            const orderData = await orderService.declineOrder(id);
            return res.status(200).json(orderData);
        }catch (e){
            next(e);
        }
    }
    async getOrders(req, res, next) {
        try {
            const ordersData = await orderService.getOrders();
            return res.status(200).json(ordersData);
        } catch (e) {
            next(e);
        }
    }
}