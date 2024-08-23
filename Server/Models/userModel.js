const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    forName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'USER',
        require: true
    },
    cart_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Cart'
    }
})

module.exports = mongoose.model('User', userSchema)