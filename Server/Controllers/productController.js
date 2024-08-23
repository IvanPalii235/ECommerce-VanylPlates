const productModel = require('../Models/productModel')
const productService = require('../Services/productService')
const uuid = require('uuid')
const path = require('path')

class ProductController {
    async create(req, res, next)
    {
        try {
            const  {name, genre, artist, date_of_releasing, price, description, quantity} = req.body
            const {img} = req.files
            let imgName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', imgName))

            const product = await productService.create(name, genre, artist, date_of_releasing, price, description, quantity, imgName)

            return res.status(200).json(product)
        }catch (e){
            next(e);
        }
    }
    async getAll(req, res, next)
    {
        try {
            const params = req.query;
            const result = await productService.getAll(params);
            return res.status(200).json(result)
        }catch (e){
            next(e)
        }

    }
    async getOne(req, res, next)
    {
        try{
            const {id} = req.params
            const product_id = await productService.getOne(id)

            return res.status(200).json(product_id)
        }catch (e){
            next(e)
        }
    }
    async delete(req, res, next)
    {
        try {
            const {id} = req.params
            const productDel = await productService.delete(id)

            return res.status(200).json(productDel)
        }catch (e){
            next(e)
        }
    }


}
module.exports = new ProductController();