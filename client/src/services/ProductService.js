import {$authHost, $host} from "../http/index";

export default class ProductService {
    static async createProduct(product) {
        return await $authHost.post('product/create', product)
    }
    static async deleteOneProduct (_id) {
        return await $authHost.delete(`product/delete/${_id}`);
    }
    static async getProducts (minPrice, maxPrice, minStock, maxStock, sort_price, sort_rating) {
        console.log(minPrice, maxPrice, minStock, maxStock)
        return await $host.get(`product/allproducts`, {params: {minPrice, maxPrice, minStock, maxStock, sort_price, sort_rating}})
    }
    static async getOneProduct (_id) {
        return await $host.get(`product/${_id}`);
    }
}