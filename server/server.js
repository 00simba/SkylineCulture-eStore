const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/products')
const Order = require('./models/orders')
const bodyParser = require('body-parser')
const app = express()
app.use(express.json())
app.use(express.static('../client/build'))
app.use(bodyParser.urlencoded({extended: false}))
const cors = require("cors")
app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
const axios = require('axios');
const { update } = require('./models/products')
require('dotenv').config()

const dbURI = process.env.DATABASE_URI;
mongoose.connect(dbURI, {dbName: 'website-db', useNewUrlParser: true, useUnifiedTopology: true}).then((result) => console.log('Connected to DB')).catch((err) => console.log(err))

const storeItems = new Map()
Product.find().then((result) => result.map((item) => {
    storeItems.set(item.id, {name: item.name, price: item.price, stock: item.stock})
}))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

let cart = [];

let customer = {
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

var ID;


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
    res.send(customer)
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
        var orderModel = await new Order()
        orderModel.orderID = req.body.orderID
        ID = req.body.orderID
        orderModel.customer = customer
        orderModel.items = cart.items
        await orderModel.save()
        console.log("Saved")
})

app.post('/delete-item', async (req, res) => {
    await Order.deleteOne({orderID: ID, items: cart.items, customer: customer}).then(() => {
        console.log("Deleted")
    }).catch((error) => {
        console.log(error)
    })
})

app.post('/get-stock', async (req, res) => {
    await Product.find({name: req.body.productName}).then((response) => {
        res.send(response)}).catch((err) => {console.log(err)})
})

app.post('/get-customer', (req,res) => {
    res.send(customer)
})

app.post('/get-tracking', async (req, res) => {
    await axios.get(`https://chitchats.com/tracking/${req.body.orderID}.json`).then((response) => {
            res.send(response.data)
    }).catch((err) => console.log(err)) 
})

app.post('/remove-inventory', async (req, res) => {
    cart.items.forEach(async (item) => {
        await Product.findOne({name: item.productName}).then(async (product) => {

            product = product.toObject()
            
            if(item.productVariant === "null"){
                let productCount = parseInt(product.stock[0].Default)
                let itemCount = parseInt(item.productQuantity)
                let updatedCount = productCount - itemCount
    
                await Product.findOneAndUpdate(
                    {
                        "name" : product.name
                    },
                    {
                        "$set": {"stock.$[elem].Default": updatedCount}
                    },
                    { arrayFilters: [ { "elem.Default": { $eq: productCount } } ] }
                )
        
            }
            else{
                let productCount = parseInt(product.stock[0][item.productVariant])
                let itemCount = parseInt(item.productQuantity)
                let updatedCount = productCount - itemCount

                await Product.findOneAndUpdate(
                    {
                        "name" : product.name
                    },
                    {
                        "$set": { [`stock.$[elem].${item.productVariant}`] : updatedCount}
                    },
                    { arrayFilters: [ { [`elem.${item.productVariant}`] : { $eq: productCount } } ] }
                )
            }
        })
    })
})


app.post('/add-inventory', async (req, res) => {
    cart.items.forEach(async (item) => {
        await Product.findOne({name: item.productName}).then(async (product) => {

            product = product.toObject()
            
            if(item.productVariant === "null"){
                let productCount = parseInt(product.stock[0].Default)
                let itemCount = parseInt(item.productQuantity)
                let updatedCount = productCount + itemCount

                await Product.findOneAndUpdate(
                    {
                        "name" : product.name
                    },
                    {
                        "$set": {"stock.$[elem].Default": updatedCount}
                    },
                    { arrayFilters: [ { "elem.Default": { $eq: productCount } } ] }
                )
            }
            else{
                let productCount = parseInt(product.stock[0][item.productVariant])
                let itemCount = parseInt(item.productQuantity)
                let updatedCount = productCount + itemCount

                await Product.findOneAndUpdate(
                    {
                        "name" : product.name
                    },
                    {
                        "$set": { [`stock.$[elem].${item.productVariant}`] : updatedCount}
                    },
                    { arrayFilters: [ { [`elem.${item.productVariant}`] : { $eq: productCount } } ] }
                )
            }
        })
    })
})

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running on port 8080")
})