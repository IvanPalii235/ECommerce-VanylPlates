import {$authHost} from "../http/index";

export default class OrdersService {
    static async createOrder () {
        return await $authHost.post('order/create')
    }
    static async cancelOrder (id) {
        return await $authHost.delete(`order/delete/${id}`)
    }
    static async getOrders(){
        return await $authHost.get('order/orders')
    }

}