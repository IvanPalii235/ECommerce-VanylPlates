import {$authHost} from "../http/index";

export default class CartService {
    static async addProduct (userId, productId) {
        console.log(userId, productId)
        return await $authHost.post('cart/', {userId, productId})
    }
    static async deleteProduct (userId, productId) {
        return await $authHost.delete(`cart/?userId=${userId}&productId=${productId}`)
    }
    static async getProduct (userId) {
        return await $authHost.get(`cart/${userId}`)
    }
}