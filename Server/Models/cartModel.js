const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },

    quantity: {
        type: Number,
        required: true,
        default: 0
    },

    price: {
        type: Number,
        required: true
    },

    total: {
        type: Number,
        required: true
    }
})
const cartSchema = new mongoose.Schema({
    items:[itemSchema],

    subTotal: {
        default: 0,
        type: Number
    }
});

module.exports = mongoose.model('Cart', cartSchema);