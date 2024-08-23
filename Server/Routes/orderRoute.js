const Router = require('express').Router;
const orderRouter = new Router();
const orderController = require('../Controllers/orderController');
const authMiddleware = require('../Middleware/authMiddleware');
const checkRole = require('../Middleware/checkRoleMiddleware')

orderRouter.post('/create', authMiddleware, orderController.createOrder);
orderRouter.get('/orders', authMiddleware, checkRole("ADMIN"), orderController.getOrders);
orderRouter.delete('/delete/:id', authMiddleware,  checkRole("ADMIN"), orderController.cancelOrder);

module.exports = orderRouter;