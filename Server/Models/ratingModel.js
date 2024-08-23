const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    rating:{
        type: Number,
        required : true,
        min: 0,
        max: 5,
        default: 0
    },
});

module.exports = mongoose.model('Rating', ratingSchema);