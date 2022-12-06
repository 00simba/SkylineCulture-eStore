require('dotenv').config()
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

const dbURI = process.env.DATABASE_URI;
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}).then((result) => console.log('Connected to DB')).catch((err) => console.log(err))

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


app.get('/*', (req,res) =>{
    res.sendFile(path.resolve(__dirname,'..', 'client', 'build', 'index.html'));
});

app.get('/', (req, res) => {
    res.json("Server Started")
})

app.post("/get-items", (req,res) => {
    cart = req.body
    res.send(cart)
})

app.post("/collect", (req, res) =>{
    customer.email = req.body.email
    customer.firstname = req.body.firstname
    customer.lastname = req.body.lastname
    customer.address = req.body.address
    customer.optional_address =  req.body.optional_address
    customer.city = req.body.city
    customer.code = req.body.code
    customer.country = req.body.country
    customer.region = req.body.region
    res.send(req.body)
}
)

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


app.post("/payment", cors(), async (req, res) => {
	let {id} = req.body
    var total = calculateTotal()
	try {
		const payment = await stripe.paymentIntents.create({
			amount: total,
            receipt_email: customer.email,
			currency: "USD",
			description: "Skyline Company",
			payment_method: id,
			confirm: true,
		})
		res.json({
			message: "Payment successful",
			success: true,
		})
        var orderModel = new Order()
        orderModel.customer = customer
        orderModel.items = cart.items
        await orderModel.save()
	} catch (error) {
		res.json({
			message: "Payment failed",
			success: false,
		})
	}
    
})

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running on port 8080")
})