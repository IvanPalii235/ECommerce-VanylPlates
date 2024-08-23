const ratingService = require('../Services/ratingService');
const ApiError = require('../Error/apiError');
const userService = require("../Services/userService");

module.exports = new class reviewController{
    async createRating(req, res, next){
        try{
            const{product_id, rating} = req.body;
            const reviewData = await ratingService.createRating(req.userData, product_id, rating);
            return res.status(200).json(reviewData);
        }catch (e){
            return next(e);
        }
    }
    async getRating(req, res, next){
        try{
            const {id} = req.params;
            const reviewsData = await ratingService.getRating(id);
            return res.status(200).json(reviewsData)
        }catch (e){
            next(e);
        }
    }
}