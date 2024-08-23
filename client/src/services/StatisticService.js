import {$authHost} from "../http/index";

export default class StatisticService {
    static async topFivePerWeek () {
        return await $authHost.get('statistics/topfive')
    }
    static async ordersPerWeek(){
        return await $authHost.get('statistics/topweek')
    }
    static async ordersPerMonth(){
        return await $authHost.get('statistics/topmonth')
    }
    static async ordersSumPerDay(){
        return await $authHost.get('statistics/topday')
    }
}