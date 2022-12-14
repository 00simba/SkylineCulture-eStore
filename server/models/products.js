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
    stock: [{
        variant: {type: String},
        amount: {type: Number}
    }]
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product