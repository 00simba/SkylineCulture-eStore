import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import React, { useEffect } from 'react'
import './payment.css'
import axios from "axios";

export default function CheckoutForm(props) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    axios.post("https://skylineculture-api.onrender.com/save-items", {orderID : props.orderID}).then((res) => {})

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `https://skylineculture.onrender.com/order-complete`,
        shipping: {
          address: {
            city: props.customer.city,
            country: props.customer.country,
            line1: props.customer.address,
            line2: props.customer.address_optional,
            postal_code: props.customer.code,
            state: props.customer.region
          },
          name: props.customer.firstname + ' ' + props.customer.lastname
        }
      },
    }).catch((error) => {
      console.error(error);
      axios.post("https://skylineculture-api.onrender.com/delete-item", {orderID : props.orderID}).then((res) => {});
    })

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }
    
    setIsProcessing(false); 

  };


  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Place Order"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}