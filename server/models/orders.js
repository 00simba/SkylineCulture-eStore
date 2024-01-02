const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderID: {
        type: Number,
        require: true
    },
    items: {
        type: Array,
        required: true
    },
    sessionID: {
        type: String,
        require: true
    }
})


const Order = mongoose.model('Order', orderSchema)

module.exports = Order