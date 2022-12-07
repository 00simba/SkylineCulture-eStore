import { useEffect, useState } from "react";
import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from 'react-router-dom'
import Summary from '../../Components/Summary'

function PaymentTest(props) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("https://skylineculture.onrender.com/config", {
        method: "POST",
    }).then(async (r) => {
        const { publishableKey } = await r.json();
        setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    fetch("https://skylineculture.onrender.com/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  const shortid = require('shortid');
  const id = shortid.generate();


  return (
    <div className="App">
        <Link to={`/checkout/${id}`}><div className='backContainer'><div className='backButton' type="button" onClick={() => props.changeId(id)}>Back</div></div></Link>   
        <div className = "paymentWrapper">
        <h2 className='almostHeader'>Almost There</h2>
            <div className='secureNote'>
            <span>We will never save your card information and this checkout is secure.</span>
            </div>
            <div className="paymentInfo">
                {clientSecret && stripePromise && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm />
                    </Elements>
                )}
                <Summary cartItems={props.cartItems} country={props.country}/>
            </div>
        </div>
    </div>
  );
}

export default PaymentTest;