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
const { countryToAlpha2 } = require('country-to-iso')

require('dotenv').config()

const dbURI = process.env.DATABASE_URI;
mongoose.connect(dbURI, {dbName: 'website-db', useNewUrlParser: true, useUnifiedTopology: true}).then((result) => console.log('Connected to DB')).catch((err) => console.log(err))

const storeItems = new Map()
Product.find().then((result) => result.map((item) => {
    storeItems.set(item.id, {name: item.name, price: item.price, stripe_price: item.stripe_price, stock: item.stock})
}))

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)

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

// app.post('/create-customer', async (req, res) => {
//     try{
//         var Alpha2 = countryToAlpha2(req.body.country)
//         const stripeCustomer = await stripe.customers.create({
//             name : req.body.firstname + ' ' + req.body.lastname,
//             email: req.body.email,
//             address:{
//                 city: req.body.city,
//                 country: Alpha2,
//                 line1: req.body.address,
//                 line2: req.body.address_optional,
//                 postal_code: req.body.code,
//                 state: req.body.region
//             }
//         }) 
//         customer.cus_id = stripeCustomer.id
//         customer.email = req.body.email
//         customer.firstname = req.body.firstname
//         customer.lastname = req.body.lastname
//         customer.address = req.body.address
//         customer.address_optional =  req.body.address_optional
//         customer.city = req.body.city
//         customer.code = req.body.code
//         customer.country = req.body.country
//         customer.region = req.body.region
//     } catch (e) {
//         return res.status(400).send({
//             error: {
//               message: e.message,
//             },
//         });
//     }
// })

app.post('/config', (req, res) => {
    res.json({ publishableKey : 'pk_live_NUvboNKoFJl7b8W2UwzNphXv00wcelkZMY'})
})

function calculateTotal(){
    var total = 0;
    (cart.cartItems).forEach((itemObject) => {
        var price = ((storeItems.get(parseInt(itemObject.productId))).price)*(parseInt(itemObject.productQuantity))
        total += price 
    })
    //if(total < 3500){
    //    if(customer.country === 'Canada'){
    //        total += 795
    //    }
    //    else if(customer.country === "United States"){
    //        total += 395
    //   }
    //    else{
    //        total += 995
    //    }
    //}
    return total
}

// app.post('/create-payment-intent', async (req, res) => {
//     try {
//         const paymentIntent = await stripe.paymentIntents.create({
//             customer: customer.cus_id,
//             currency: "USD",
//             amount: calculateTotal(),
//             automatic_payment_methods: { enabled: true },
//         });
    
//         // Send publishable key and PaymentIntent details to client
//         res.json({
//           clientSecret: paymentIntent.client_secret,
//         });
//       } catch (e) {
//         return res.status(400).send({
//           error: {
//             message: e.message,
//           },
//         });
//       }
// })

app.post('/save-items', async (req, res) => {
        var orderModel = await new Order()
        orderModel.orderID = req.body.orderID
        ID = req.body.orderID
        orderModel.customer = customer
        orderModel.items = cart.cartItems
        await orderModel.save()
        console.log("Saved")
})

app.post('/delete-item', async (req, res) => {
    await Order.deleteOne({orderID: ID, items: cart.cartItems, customer: customer}).then(() => {
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
    cart.cartItems.forEach(async (item) => {
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
    cart.cartItems.forEach(async (item) => {
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


// Fetch the Checkout Session to display the JSON result on the success page
app.get('/checkout-session', async (req, res) => {
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.send(session);
  });

function getShipping(country){

    var shipping = []

    if(calculateTotal() < 3500){
        if(country == 'Canada'){
            shipping.push({
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {
                    amount: 795,
                    currency: 'usd',
                  },
                  display_name: 'Canada Post',
                  delivery_estimate: {
                    minimum: {
                      unit: 'business_day',
                      value: 2,
                    },
                    maximum: {
                      unit: 'business_day',
                      value: 8,
                    },
                  },
                },
              })
        } 
        else if(country == "United States"){
            shipping.push({
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {
                    amount: 395,
                    currency: 'usd',
                  },
                  display_name: 'USPS First Class',
                  delivery_estimate: {
                    minimum: {
                      unit: 'business_day',
                      value: 3,
                    },
                    maximum: {
                      unit: 'business_day',
                      value: 5,
                    },
                  },
                },
              })
        }
        else{
            shipping.push({
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {
                    amount: 995,
                    currency: 'usd',
                  },
                  display_name: 'Asendia International',
                  delivery_estimate: {
                    minimum: {
                      unit: 'business_day',
                      value: 5,
                    },
                    maximum: {
                      unit: 'business_day',
                      value: 22,
                    },
                  },
                },
              })
        }
    }
    else{
        if(country == 'Canada'){
            shipping.push({
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {
                    amount: 0,
                    currency: 'usd',
                  },
                  display_name: 'Canada Post',
                  delivery_estimate: {
                    minimum: {
                      unit: 'business_day',
                      value: 2,
                    },
                    maximum: {
                      unit: 'business_day',
                      value: 8,
                    },
                  },
                },
              })
        } 
        else if(country == "United States"){
            shipping.push({
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {
                    amount: 0,
                    currency: 'usd',
                  },
                  display_name: 'USPS',
                  delivery_estimate: {
                    minimum: {
                      unit: 'business_day',
                      value: 3,
                    },
                    maximum: {
                      unit: 'business_day',
                      value: 5,
                    },
                  },
                },
              })
        }
        else{
            shipping.push({
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {
                    amount: 0,
                    currency: 'usd',
                  },
                  display_name: 'Asendia International',
                  delivery_estimate: {
                    minimum: {
                      unit: 'business_day',
                      value: 5,
                    },
                    maximum: {
                      unit: 'business_day',
                      value: 22,
                    },
                  },
                },
              })
        }
    }
    return shipping     
}

function getLineItems(){

    var line_items = []

    console.log(cart)

    cart['cartItems'].forEach((cartItem) => {
  
        if(cartItem.productVariant != 'null'){
            var priceString = storeItems.get(parseInt(cartItem.productId)).stripe_price
            stringArr = priceString.split(' ')
            priceIndex = stringArr.indexOf(cartItem.productVariant) + 1
            var stripe_price = stringArr[priceIndex]

            line_items.push({
                price: stripe_price,
                quantity: parseInt(cartItem.productQuantity)
            })    
        }
        else{
            line_items.push({
                price: storeItems.get(parseInt(cartItem.productId)).stripe_price,
                quantity: parseInt(cartItem.productQuantity)
            })
        } 

    })

    return line_items

}


app.post('/create-checkout-session', async (req, res) => {
    const domainURL = 'https://www.skylineculture.store';

    // Create new Checkout Session for the order
    // Other optional params include:
    // [billing_address_collection] - to display billing address details on the page
    // [customer] - if you have an existing Stripe Customer ID
    // [customer_email] - lets you prefill the email input in the Checkout page
    // [automatic_tax] - to automatically calculate sales tax, VAT and GST in the checkout page
    // For full details see https://stripe.com/docs/api/checkout/sessions/create
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      invoice_creation: {
        enabled: true,
      },
      customer_creation: "always",
      allow_promotion_codes: true,
      shipping_address_collection: {allowed_countries: ['CA', 'US', 'GB', 'AU', 'NZ', 'FR', 'DE', 'BE', 'DK', 'IS', 'IE', 'FI', 'SE', 'CH', 'NL', 'NO', 'HK', 'JP', 'SG', 'ZA', 'KW', 'AE', 'QA']},
      line_items: getLineItems(),
      success_url: `${domainURL}/order-complete`,
      cancel_url: `${domainURL}/cart`,
      billing_address_collection: 'required',
      shipping_options: getShipping(req.body.country),
    });

    return res.send({url: session.url});

  });

  
  
  // Webhook handler for asynchronous events.
  app.post('/webhook', async (req, res) => {
    let data;
    let eventType;
    // Check if webhook signing is configured.
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      let event;
      let signature = req.headers['stripe-signature'];
  
      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data;
      eventType = req.body.type;
    }
  
    if (eventType === 'checkout.session.completed') {
      console.log(`🔔  Payment received!`);
    }
  
    res.sendStatus(200);
});

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running on port 8080")
})