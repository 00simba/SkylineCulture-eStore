import { useEffect, useState } from "react";
import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from 'react-router-dom'
import Summary from '../../Components/Summary'
import axios from "axios";

function PaymentTest(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [customer, setCustomer] = useState(null)

  useEffect(() => {
    axios.post("https://skylineculture-api.onrender.com/config").then(function (res){
      const publishableKey = res.data.publishableKey
      setStripePromise(loadStripe(publishableKey))
    } )
  }, []);

  useEffect(() => {
    axios.post("https://skylineculture-api.onrender.com/create-payment-intent",  {}).then(function (res){
      const clientSecret = res.data.clientSecret
      setClientSecret(clientSecret)
    } )
  }, []);

  useEffect(() => {
    axios.post("https://skylineculture-api.onrender.com/get-customer").then((res) => {
      const customer = res.data
      setCustomer(customer)
    }).catch((err) => console.log(err))
  }, [])

  const shortid = require('shortid');
  const id = shortid.generate();

  const orderIDArr = clientSecret.split('_')
  const orderID = orderIDArr[0] + '_' + orderIDArr[1]


  return (
    <div className="App">
        <Link to={`/checkout/${id}`}><div className='backContainer'><div className='backButton' type="button" onClick={() => props.changeId(id)}>Back</div></div></Link>   
        <div className = "paymentWrapper">
        <h2 className='almostHeader'>Payment</h2>
            <div className='secureNote'>
            <span>We will never save your card information and this checkout is secure.</span>
            </div>
            <div className="paymentInfo">
                {clientSecret && stripePromise && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <CheckoutForm clientSecret={clientSecret} customer={customer} orderID={orderID}/>
                    </Elements>
                )}
                <Summary cartItems={props.cartItems} country={props.country}/>
            </div>
        </div>
    </div>
  );
}

export default PaymentTest;