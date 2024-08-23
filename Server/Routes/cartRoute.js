const Router = require('express').Router;
const cartRouter = new Router();
const cartController = require('../Controllers/cartController');
const authMiddleware = require('../Middleware/authMiddleware');

cartRouter.post('/', authMiddleware, cartController.addElementToCart);
cartRouter.delete('/', authMiddleware, cartController.deleteElementFromCart);
cartRouter.get('/:id', authMiddleware, cartController.getAll);

module.exports = cartRouter;