const UserModel = require('../Models/userModel')
const ProductModel = require('../Models/productModel')
const RatingModel = require('../Models/ratingModel')
const ApiError = require('../Error/apiError')

module.exports = new class RatingService {
    async createRating(userData, product_id, rating) {
        const candidate = await RatingModel.find({user_id: userData._id, product_id: product_id})
        if(candidate[0] !== undefined){
            throw ApiError.BadRequest(`Your rating has been already set`)
        }
        const ratings = await RatingModel.find({product_id: product_id})
        const newRating = await RatingModel.create({user_id: userData._id, product_id: product_id, rating})
        ratings.push(newRating)

        const productData = await ProductModel.findOne({_id : product_id})
        let total_rating = 0
        ratings.forEach(item => {
            total_rating += item.rating
        })
        productData.total_rating = (total_rating/ratings.length).toFixed(1)

        return productData.save()
    }
    async getRating(product_id) {
        return RatingModel.find({product_id: product_id})
    }
}