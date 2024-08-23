const orderModel = require('../Models/orderModel')

class StatisticService {
    async topFivePerWeek(){
        let dateNow = new Date();

        let dateOfPreviousDay = new Date();
        dateOfPreviousDay.setDate(dateOfPreviousDay.getDate() - 7)

        const topFive = await orderModel.aggregate([
            { $match :{ orderDateObject: {$gte: dateOfPreviousDay, $lt: dateNow }}},
            { $unwind: '$items'},
            { $group: {_id: '$items.productId', count : {$sum : "$items.quantity"}}},
            { $sort: {count: -1}},
            { $limit : 5},
            { $lookup: { from: 'products' , localField: '_id', foreignField: '_id', as: 'product'} },
            { $unwind: '$product'},
            { $project: {_id: 1, name: '$product.name', img: '$product.img', count : 1}},
        ])
        dateNow =  dateNow.toLocaleString()
        dateOfPreviousDay = dateOfPreviousDay.toLocaleString()
        return {topFive, dateNow, dateOfPreviousDay}
    }
    async ordersPerWeek(){
        let dateNow = new Date();

        let dateOfPreviousDay = new Date();
        dateOfPreviousDay.setDate(dateOfPreviousDay.getDate() - 7)

        return  orderModel.aggregate([
            { $match :{ orderDateObject: {$gte: dateOfPreviousDay, $lt: dateNow }}},
            { $group: {_id: 'ordersPerWeek', count :{ $count : {}}} },
        ])
    }
    async ordersPerMonth(){
        let dateNow = new Date();

        let dateOfPreviousDay = new Date();
        dateOfPreviousDay.setMonth(dateOfPreviousDay.getMonth() - 1)

        return  orderModel.aggregate([
            { $match :{ orderDateObject: {$gte: dateOfPreviousDay, $lt: dateNow }}},
            { $group: {_id: 'ordersPerMonth', count :{ $count : {}}} },
        ])
    }

    async ordersSumPerDay(){
        let dateNow = new Date();

        let dateOfPreviousDay = new Date();
        dateOfPreviousDay.setDate(dateOfPreviousDay.getDate() - 1)
        return orderModel.aggregate([
            { $match :{ orderDateObject: {$gte: dateOfPreviousDay, $lt: dateNow }}},
            { $group: {_id: 'ordersSumPerDay', sumPerDay :{ $sum: '$subTotal'}} },
        ]);
    }
}

module.exports = new StatisticService()