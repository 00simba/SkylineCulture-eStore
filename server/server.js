require('dotenv').config()

const path = require('path')


const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/products')
const { execPath } = require('process')
const app = express()
app.use(express.json())
app.use(express.static('../client/build'))

var database
const dbURI = process.env.DATABASE_URI;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}).then((result) => console.log('Connected to DB')).catch((err) => console.log(err))


/* const storeItems = new Map([
    [1, {
        name : 'R34 GTR Keychain',
        price : 1500,

    }],
    [2, {
        name : 'R32 GTR Keychain',
        price : 1500,
    }],
    [3, {
        name : 'R34 GTR Pin',
        price : 2000,
    }],
    [4, {
        name : 'RB26 Keychain',
        price : 900,
    }],
]) */

const storeItems = new Map()
Product.find().then((result) => result.map((item) => {
    storeItems.set(item.id, {name: item.name, price: item.price})
}))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

app.get('*', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'..', 'client', 'build', 'index.html'));
});


app.post('/create-checkout-session', async (req,res) => {
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            shipping_address_collection: {allowed_countries: ['US', 'CA']},
            line_items: req.body.items.map(item => {
                const storeItem = storeItems.get(item.id)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name
                        },
                        unit_amount: storeItem.price
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}/`,
            cancel_url: `${process.env.SERVER_URL}/cart`
        })
        res.json({url: session.url})
    } catch(e) {
        res.status(500).json({error: e.message})
    }
})


app.listen(3001, () => {
    console.log("Server is running on port 3001")
})