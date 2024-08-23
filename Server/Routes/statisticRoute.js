const Router = require('express').Router
const statisticRouter = new Router()
const statisticController = require('../Controllers/statisticController')
const authMiddleware = require('../Middleware/authMiddleware')
const checkRole = require('../Middleware/checkRoleMiddleware')

statisticRouter.get('/topfive', authMiddleware, checkRole("ADMIN"), statisticController.topFivePerWeek)
statisticRouter.get('/topweek', authMiddleware, checkRole("ADMIN"), statisticController.ordersPerWeek)
statisticRouter.get('/topmonth', authMiddleware, checkRole("ADMIN"), statisticController.ordersPerMonth)
statisticRouter.get('/topday', authMiddleware, checkRole("ADMIN"), statisticController.ordersSumPerDay)

module.exports = statisticRouter
