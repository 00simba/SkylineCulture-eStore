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
app.use(express.static(path.join(__dirname, '..', 'client', 'build')))
const axios = require('axios');
const { Country } = require('country-and-province')
const { countryToAlpha2 }= require('country-to-iso')

require('dotenv').config()

const dbURI = process.env.DATABASE_URI;
mongoose.connect(dbURI, {dbName: 'website-db', useNewUrlParser: true, useUnifiedTopology: true}).then((result) => console.log('Connected to DB')).catch((err) => console.log(err))

const storeItems = new Map()
Product.find().then((result) => result.map((item) => {
    storeItems.set(item.id, {name: item.name, price: item.price, stock: item.stock})
}))

const stripe = require('stripe')('sk_test_r7LRraq8cpR1wwDUSF6aXKhY00DcUrutz9')

let cart = [];

var customer = {
    cus_id: "",
    email: "",
    firstname: "",
    lastname: "",
    address: "",
    address_optional: "", 
    city: "",
    code: "",
    country: "",
    region: ""
}

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

app.post('/create-customer', async (req, res) => {
    try{
        var Alpha2 = countryToAlpha2(req.body.country)
        const stripeCustomer = await stripe.customers.create({
            name : req.body.firstname + ' ' + req.body.lastname,
            email: req.body.email,
            address:{
                city: req.body.city,
                country: Alpha2,
                line1: req.body.address,
                line2: req.body.address_optional,
                postal_code: req.body.code,
                state: req.body.region
            }
        }) 
        customer.cus_id = stripeCustomer.id
        customer.email = req.body.email
        customer.firstname = req.body.firstname
        customer.lastname = req.body.lastname
        customer.address = req.body.address
        customer.address_optional =  req.body.address_optional
        customer.city = req.body.city
        customer.code = req.body.code
        customer.country = req.body.country
        customer.region = req.body.region
    } catch (e) {
        return res.status(400).send({
            error: {
              message: e.message,
            },
        });
    }
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
    if(total < 3500){
        if(customer.country === 'Canada'){
            total += 795
        }
        else if(customer.country === "United States"){
            total += 395
        }
        else{
            total += 995
        }
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

app.post('/create-shipment', async (req, res) => {  

    var value = 0.00;
    (cart.items).forEach((itemObject) => {
        value += ((storeItems.get(parseInt(itemObject.productId))).price)*(parseInt(itemObject.productQuantity))
    })

    let stringValue = (value * 1.00 / 100).toFixed(2)

    var CCA2Country = '';

    await axios.get(`https://restcountries.com/v3.1/name/${customer.country}`).then((res) => CCA2Country = res.data[0].cca2).catch((err) => console.error(err))

    let provinceCode = ''

    new Country(CCA2Country).provinces.data.forEach((obj) => {
        if(obj.name === customer.region){
            provinceCode = obj.code
        }
    })

    await axios.post(`https://chitchats.com/api/v1/clients/${process.env.CHITCHATS_CLIENT_ID}/shipments`, {
        "name": `${customer.firstname}\u00A0${customer.lastname}`,
        "address_1": `${customer.address}`,
        "address_2": `${customer.address_optional}`,
        "city": `${customer.city}`,
        "province_code": `${provinceCode}`,
        "postal_code": `${customer.code}`,
        "country_code": `${CCA2Country}`,
        "package_contents": "merchandise",
        "description": "Keychains, Enamel Pins, and Diecast Cars",
        "value": stringValue,
        "value_currency": "usd",
        "order_id": "",
        "order_store": "",
        "package_type": "parcel",
        "weight_unit": "g",
        "weight": 100,
        "size_unit": "cm",
        "size_x": 17,
        "size_y": 10,
        "size_z": 2,
        "insurance_requested": true,
        "signature_requested": false,
        "vat_reference": "",
        "duties_paid_requested": false,
        "postage_type": "chit_chats_canada_tracked",
        "cheapest_postage_type_requested": "no",
        "tracking_number": "",
        "ship_date": "today"
    }, { headers: {
        "Accept" : "*/*",
        "Accept-Encoding" : "gzip, deflate, br",
        "Connection" : "keep-alive",
        "Authorization": `${process.env.CHITCHATS_TOKEN}`,
        "Content-Type": "application/json" } 
    }).then((res) => {console.log('Shipment Created')}).catch((err) => {console.error(err)})
})

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running on port 8080")
})