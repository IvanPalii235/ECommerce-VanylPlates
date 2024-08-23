const cartModel = require('../Models/cartModel')
const userModel = require('../Models/userModel')
const productModel = require('../Models/productModel')
const ApiError = require('../error/ApiError')

class CartService {
    async create(){
        return await cartModel.create({});
    }
    async addToCart(userId, productId)
    {
        const productData = await productModel.findById(productId)
        if(!productData)
        {
            throw ApiError.BadRequest('No product with such id')
        }
        const userData = await userModel.findById(userId)
        if(!userData)
        {
            throw ApiError.BadRequest('No user with such id')
        }
        const cart = await cartModel.findById(userData.cart_id)
        if(!cart)
        {
            throw ApiError.BadRequest('User doesn`t have cart')
        }
        let indexFound = cart.items.findIndex(item => (item.productId == productId))
        if(indexFound === -1)
        {
            cart.items.push({
                productId: productId,
                quantity: 1,
                price: productData.price,
                total: parseInt(productData.price),
            })
        }
        if(indexFound !== -1)
        {
            cart.items[indexFound].quantity += 1
            let quantity = cart.items[indexFound].quantity
            cart.items[indexFound].total = (productData.price * quantity)
        }
        cart.subTotal = 0;
        cart.items.forEach(item => {
            cart.subTotal += item.total;
        })
        return await cart.save()
    }
    async deleteCartElement(userId, productId)
    {
        const userData = await userModel.findById(userId)
        if(!userData)
        {
            throw ApiError.BadRequest('No user with such id')
        }
        const cart = await cartModel.findById(userData.cart_id)
        if(!cart)
        {
            throw ApiError.BadRequest('User doesn`t have cart')
        }
        let indexFound = cart.items.findIndex(item => (item.productId == productId))
        if(indexFound === -1)
        {
            throw ApiError.BadRequest('Cart don`t have this item')
        }
        const productData = await productModel.findById(productId);
        if(!productData){
            cart.items.splice(indexFound, 1);
            cart.subTotal = 0;
            cart.items.forEach(item => {
                cart.subTotal += item.total;
            })
            return await cart.save();
        }

        if(cart.items[indexFound].quantity !== 0){
            cart.items[indexFound].quantity -= 1;
            let quantity = cart.items[indexFound].quantity;
            if(quantity === 0){
                cart.items.splice(indexFound, 1);
                cart.subTotal = 0;
                cart.items.forEach(item => {
                    cart.subTotal += item.total;
                })
                return await cart.save();
            }
            cart.items[indexFound].total = (cart.items[indexFound].price *  quantity);
        }
        cart.subTotal = 0;
        cart.items.forEach(item => {
            cart.subTotal += item.total;
        })
        return await cart.save()
    }
    async getAllCartElements(userId)
    {
        const userData = await userModel.findById(userId)
        if(!userData)
        {
            throw ApiError.BadRequest('No user with such id')
        }
        const cartData = await cartModel.findById(userData.cart_id)
        if(!cartData)
        {
            throw ApiError.BadRequest('User doesn`t have cart')
        }
        return cartData
    }
}
module.exports = new CartService()