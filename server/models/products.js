const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stripe_price:{
        type: String,
        required: true
    },
    stock: {
        type: Array,
        required: true
    },
    reviews: {
        type: Array,
        required: false
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product