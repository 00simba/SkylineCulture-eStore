const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderNumber: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    }
})


const Order = mongoose.model('Order', orderSchema)

module.exports = Order