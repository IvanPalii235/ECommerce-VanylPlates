const Router = require('express').Router
const router = new Router()

const userRoute = require('./userRoute')
const productRoute = require('./productRoute')
const cartRoute = require('./cartRoute');
const ratingRoute = require('./ratingRoute');
const orderRoute = require('./orderRoute');
const statisticRoute = require('./statisticRoute');


router.use('/user', userRoute)
router.use('/product', productRoute)
router.use('/cart', cartRoute);
router.use('/rating', ratingRoute);
router.use('/order', orderRoute);
router.use('/statistics', statisticRoute);


module.exports = router