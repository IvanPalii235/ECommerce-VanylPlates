const Router = require('express').Router;
const checkRole = require('../Middleware/checkRoleMiddleware')
const authMiddleware = require('../Middleware/authMiddleware')

const productRouter = new Router();

const productController = require('../Controllers/productController')

productRouter.post('/create', checkRole('ADMIN'), authMiddleware, productController.create)
productRouter.delete('/delete/:id', checkRole('ADMIN'), authMiddleware, productController.delete)
productRouter.get('/allproducts', productController.getAll)
productRouter.get('/:id', productController.getOne)

module.exports = productRouter;