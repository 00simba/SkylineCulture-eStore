const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/products')
const Order = require('./models/orders')
const bodyParser = require('body-parser')
const shortid = require('shortid');
const app = express()
app.use(express.json())
app.use(express.static('../client/build'))
app.use(bodyParser.urlencoded({extended: false}))
const cors = require("cors")
app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
require('dotenv').config()

const dbURI = process.env.DATABASE_URI;
mongoose.connect(dbURI, {dbName: 'website-db', useNewUrlParser: true, useUnifiedTopology: true}).then((result) => console.log('Connected to DB')).catch((err) => console.log(err))

const storeItems = new Map()
Product.find().then((result) => result.map((item) => {
    storeItems.set(item.id, {name: item.name, price: item.price})
}))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

let cart=[];

let customer={
    email: "",
    firstname: "",
    lastname: "",
    address: "",
    address_optional: "", 
    city: "",
    code: "",
    country: "",
    region: "",
};


app.get('*', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'..', 'client', 'build', 'index.html'));
});

app.post("/get-items", (req,res) => {
    cart = req.body
    res.send(cart)
})

app.post("/collect", (req, res) =>{
    customer.email = req.body.email 
    customer.firstname = req.body.firstname
    customer.lastname = req.body.lastname
    customer.address = req.body.address
    customer.address_optional =  req.body.address_optional
    customer.city = req.body.city
    customer.code = req.body.code
    customer.country = req.body.country
    customer.region = req.body.region
    res.send(req.body)
})

app.post('/config', (req, res) => {
    res.json({ publishableKey : 'pk_test_r12jgstJ5soE83k76iTP681O00lRb3pB1l'})
})

function calculateTotal(){
    var total = 0;
    (cart.items).forEach((itemObject) => {
        var price = ((storeItems.get(parseInt(itemObject.productId))).price)*(parseInt(itemObject.productQuantity))
        total += price 
    })
    if(customer.country === 'Canada'){
        total += 795
    }
    else if(customer.country === "United States"){
        total += 395
    }
    else{
        total += 995
    }
    return total
}

app.post('/create-payment-intent', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
          currency: "USD",
          amount: calculateTotal(),
          automatic_payment_methods: { enabled: true },
        });
    
        // Send publishable key and PaymentIntent details to client
        res.json({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (e) {
        return res.status(400).send({
          error: {
            message: e.message,
          },
        });
      }
})

app.post('/save-items', async (req, res) => {
        var orderModel = new Order()
        orderModel.customer = customer
        orderModel.items = cart.items
        await orderModel.save()
        res.send(res)
})

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running on port 8080")
})