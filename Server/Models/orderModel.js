const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    productId: {type: mongoose.Schema.Types.ObjectId,ref: "Product",},

    quantity: {type: Number, required: true, default: 0},

    price: {type: Number, required: true},

    total: {type: Number, required: true,}
})

const orderSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Types.ObjectId,
        ref:'User'
    },
    order_status:{
        type: String,
        required: true,
        default: 'Is Processed'
    },
    items:[itemSchema],
    subTotal: {
        default: 0,
        type: Number
    },
    orderDateString:{
        type:String,
        required: true,
        default: new Date().toLocaleString()
    },
    orderDateObject:{
        type:Date,
        required: true,
        default: new Date()
    },
    }
)
module.exports = mongoose.model('Order', orderSchema)