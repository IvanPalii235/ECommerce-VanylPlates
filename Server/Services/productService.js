const productModel = require('../Models/productModel')
const ApiError = require('../error/ApiError')

class TovarService {
    async create(name, genre, artist, date_of_releasing, price, description, quantity, img, total_rating) {
        const candidate = await productModel.findOne({name: name})
        if (candidate) {
            throw ApiError.BadRequest('This product already exist')
        }
        return await productModel.create({name, genre, artist, date_of_releasing, price, description, quantity, img, total_rating})
    }
    async getOne(id) {
        if(!id)
        {
            throw ApiError.BadRequest('Id of product wasn`t entered')
        }
        const candidate = await productModel.findById(id)
        if(!candidate){
            throw ApiError.BadRequest('This product doesn`t exist')
        }
        return candidate
    }
    async delete(id) {
        if(!id)
        {
            throw ApiError.BadRequest('Id of product wasn`t entered')
        }
        const candidate = await productModel.findById(id)
        if(!candidate){
            throw ApiError.BadRequest('This product doesn`t exist')
        }
        return productModel.findByIdAndDelete(id);
    }
    async getParams(filter) {
        const parameters = await productModel.aggregate([
            {$match : filter},
            {$group : {
                    _id: 'parameters',
                    maxPrice: {$max: 'price'}, minPrice: {$min: 'price'},
                    maxStock: {$max: 'quantity'}, minStock: {$min: 'quantity'},
                    pages:{$count : {}}
                }}
        ])

        return parameters[0];
    }
    async getAll(params) {
        let filter = { }
        console.log(params)
        if(params.minPrice && params.maxPrice){
            filter.price ={$gte: +params.minPrice, $lte: +params.maxPrice}
        }
        if (params.minStock && params.maxStock){
            filter.quantity = {$gte: +params.minStock, $lte: +params.maxStock}
        }
        console.log(filter)
        let parameters = {};
        if(+params.page === 1){
            parameters = await this.getParams(filter)
        }
        let pipeline = [
            { $match : filter },
            { $project: {_id: 1, name: 1, genre: 1, artist: 1, price: 1, img: 1, quantity: 1, total_rating: 1 } },
        ]
        if(params.sort_rating && (+params.sort_rating === 1 || +params.sort_rating === -1)){
            pipeline.unshift({$sort: {total_rating: +params.sort_rating} })
        }
        if(params.sort_price && (+params.sort_price === 1 || +params.sort_price === -1)){
            pipeline.unshift({ $sort: {price: +params.sort_price} })
        }

        const products = await productModel.aggregate(pipeline)
        return {products, parameters}
    }

}
module.exports = new TovarService()