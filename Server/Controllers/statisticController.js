const statisticService = require('../Services/statisticService');

class StatisticController{
    async topFivePerWeek(req, res, next){
        try{
            const statData = await statisticService.topFivePerWeek();
            return res.status(200).json(statData);
        }catch (e){
            next(e)
        }
    }
    async ordersPerWeek(req, res, next){
        try{
            const statData = await statisticService.ordersPerWeek();
            return res.status(200).json(statData);
        }catch (e){
            next(e)
        }
    }
    async ordersPerMonth(req, res, next){
        try{
            const statData = await statisticService.ordersPerMonth();
            return res.status(200).json(statData);
        }catch (e){
            next(e)
        }
    }
    async ordersSumPerDay(req, res, next){
        try{
            const statData = await statisticService.ordersSumPerDay();
            return res.status(200).json(statData);
        }catch (e){
            next(e)
        }
    }
}
module.exports = new StatisticController()