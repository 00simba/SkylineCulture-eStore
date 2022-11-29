const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    customer: {
        type: Object,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
})


const Order = mongoose.model('Order', orderSchema)

module.exports = Order