const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    genre: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    date_of_releasing: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    img: {
        type: String,
        required: true
    },
    total_rating: {
        type: Number,
        default : 0
    },
})

module.exports = mongoose.model('Product', productSchema)