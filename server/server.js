const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const { MongoClient } = require('mongodb'); 
const Product = require('./models/products')
const Order = require('./models/orders')
const productEmbedding = require('./modules/get-embeddings');
const vectorQuery = require('./modules/vector-query');
const bodyParser = require('body-parser')
const app = express()
app.use(express.json())
app.use(express.static('../client/build'))
app.use(bodyParser.urlencoded({extended: false}))
const cors = require("cors")
app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'client', 'build')))

require('dotenv').config()

const dbURI = process.env.DATABASE_URI;
mongoose.connect(dbURI, {dbName: 'website-db', useNewUrlParser: true, useUnifiedTopology: true}).then((result) => console.log('Connected to DB')).catch((err) => console.log(err))

const storeItems = new Map()
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY)

Product.find().then((result) => result.map((item) => {
    storeItems.set(item.id, {name: item.name, price: item.price, stripe_price: item.stripe_price, stock: item.stock, reviews: item.reviews})
}))

app.get('*', (req,res) =>{
  res.sendFile(path.resolve(__dirname,'..', 'client', 'build', 'index.html'));
});

app.post('/search-result', async(req, res) => {
  var query = req.body['query'];
  var result = await vectorQuery.vectorQuery(query);
  res.send(result);
})

app.post('/get-embeddings', async (req, res) => {
  const client = new MongoClient(dbURI);
  try {
    await client.connect();
    const db = client.db("website-db");
    const collection = db.collection("products");
    const filter = { "name": { "$nin": [ null, "" ] } };
    const documents = await collection.find(filter).limit(50).toArray();
    console.log("Generating embeddings and updating documents...");
    const updatedDocuments = [];
    await Promise.all(documents.map(async doc => {
      var embedding = await productEmbedding.getEmbedding(doc.name);
      updatedDocuments.push(
        {
          updateOne: {
            filter : {"_id" : doc._id},
            update : { $set: {"embedding": embedding }}
          }
        }
      )
    }));

    const options = { ordered: false };
    const result = await collection.bulkWrite(updatedDocuments, options);
    console.log("Count of documents updated: " + result.modifiedCount);
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
  
});


app.post('/save-items', async (req, res) => {

  var sessionID = null;
  var queryID = null;
  var orderID = 1000;

  await Order.find().sort({_id: -1}).limit(1).then((res) => {
    orderID = res[0].orderID + 1
  })

  await Order.findOne({sessionID: req.body.session_id}).then((res) => {
    if(res){
      sessionID = res.sessionID
      queryID = res.orderID
    }
  })

  if(!sessionID){
    var orderModel = await new Order()
    orderModel.orderID = orderID
    orderModel.items = cart.cartItems
    orderModel.sessionID = req.body.session_id
    await orderModel.save()
    console.log("Saved")
  }
  res.send({'orderID': queryID})
})

app.post('/get-stock', async (req, res) => {
    await Product.find({name: req.body.productName}).then((response) => {
        res.send(response);}).catch((err) => {console.log(err)})
})

app.post('/remove-inventory', async (req, res) => {

    var sessionID = null

    await Order.findOne({sessionID: req.body.session_id}).then((res) => {
      if(res){
        sessionID = res.sessionID
      }
    })

    if(!sessionID){
      console.log('Removed')
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
    }
})

function getShipping(total, country){

    var shipping = []

    if(total < 3500){
        if(country == 'Canada'){
            shipping.push({
                shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {
                    amount: 695,
                    currency: 'usd',
                  },
                  display_name: 'Canada Post Expedited',
                  delivery_estimate: {
                    minimum: {
                      unit: 'business_day',
                      value: 2,
                    },
                    maximum: {
                      unit: 'business_day',
                      value: 6,
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
                  display_name: 'USPS Ground Advantage',
                  delivery_estimate: {
                    minimum: {
                      unit: 'business_day',
                      value: 4,
                    },
                    maximum: {
                      unit: 'business_day',
                      value: 6,
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
                  display_name: 'APC Priority Worldwide',
                  delivery_estimate: {
                    minimum: {
                      unit: 'business_day',
                      value: 7,
                    },
                    maximum: {
                      unit: 'business_day',
                      value: 15,
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
                  display_name: 'Canada Post Expedited',
                  delivery_estimate: {
                    minimum: {
                      unit: 'business_day',
                      value: 2,
                    },
                    maximum: {
                      unit: 'business_day',
                      value: 6,
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
                  display_name: 'USPS Ground Advantage',
                  delivery_estimate: {
                    minimum: {
                      unit: 'business_day',
                      value: 4,
                    },
                    maximum: {
                      unit: 'business_day',
                      value: 6,
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
                  display_name: 'APC Priority Worldwide',
                  delivery_estimate: {
                    minimum: {
                      unit: 'business_day',
                      value: 7,
                    },
                    maximum: {
                      unit: 'business_day',
                      value: 15,
                    },
                  },
                },
              })
        }
    }
    return shipping     
}

function getLineItems(cart){

    var line_items = []

    cart.forEach((cartItem) => {
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

app.post('/order-complete', async (req, res) => {

  try{
    const session = await stripe.checkout.sessions.retrieve(req.body.session_id)
    const customer = await stripe.customers.retrieve(session.customer)
    res.send({'name': customer.name});
  } catch{
    console.log("The session does not exist.")
    return res.sendStatus(400)
  }
});


app.post('/create-checkout-session', async (req, res) => {


    const domainURL = 'https://skylineculture.com';
    const cart = req.body.cartItems;

    var total = 0;
    cart.forEach((itemObject) => {
        var price = ((storeItems.get(parseInt(itemObject.productId))).price)*(parseInt(itemObject.productQuantity))
        total += price 
    })

    var orderID = 1000;

    await Order.find().sort({_id: -1}).limit(1).then((res) => {
      orderID = res[0].orderID + 1
    }).catch((err) => console.log(err));

    //Apply keychain discount

    var chainCount = 0;
    var couponId;
    var prices = [];

    cart.forEach((itemObject) => {
        var name = (storeItems.get(parseInt(itemObject.productId))).name
        if(name.includes("Keychain")){
          chainCount += 1 * (parseInt(itemObject.productQuantity))
          for(var i = 0; i < parseInt(itemObject.productQuantity); i ++){
            prices.push(storeItems.get(parseInt(itemObject.productId)).price)
          }
        }
    })

    prices.sort((a, b) => a - b)
    console.log(prices)

    if(chainCount >= 4){

      discount = parseInt(prices[0]) +  parseInt(prices[1])

      const coupon = await stripe.coupons.create({
        name: "BUY 2 GET 2 FREE",
        amount_off: discount,
        "currency": 'USD',
      });
      couponId = coupon.id
    }

    if(chainCount == 2){

      discount = Math.floor(parseInt(prices[0]) / 2)

      const coupon = await stripe.coupons.create({
        name: "BUY 1 GET 1 50% OFF",
        amount_off: discount,
        "currency": 'USD',
      });
      couponId = coupon.id
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      invoice_creation: {
        enabled: true,
      },
      discounts: [
        {
        coupon: couponId
        }
      ],
      customer_creation: "always",
      shipping_address_collection: {allowed_countries: ['CA', 'US', 'GB', 'AU', 'NZ', 'FR', 'ES', 'IT', 'DE', 'PL', 'BE', 'AT', 'DK', 'IS', 'IE', 'FI', 'SE', 'CH', 'NL', 'NO', 'HK', 'JP', 'SG', 'KW', 'AE', 'QA']},
      line_items: getLineItems(cart),
      success_url: `${domainURL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/cart`,
      billing_address_collection: 'required',
      shipping_options: getShipping(total, req.body.selected),
      payment_intent_data: {
        "metadata": {
          "Order ID": orderID,
        }
      }
    });
    
    return res.send({url: session.url});

  });

app.listen(process.env.PORT || 8080, () => {
    console.log("Server is running on port 8080")
})