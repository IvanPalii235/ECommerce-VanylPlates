import {$authHost} from "../http/index";

export default class RatingService {
    static async addRating(product_id, rating) {
        console.log(product_id, rating)
        return await $authHost.post('rating/create', {product_id, rating})
    }
}