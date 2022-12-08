import axios from 'axios';
import React, { useEffect } from 'react';
import './ordercomplete.css'
import { Link } from 'react-router-dom'
 
export default function OrderComplete(){

    useEffect(() => {
        axios.post("https://skylineculture-api.onrender.com/save-items").then((res) => {
        console.log(res)
        })
    }, []);

    return(
        <div className='completeContainer'>
            <div className='headingContainer'>
                <h2>Your order has been placed!</h2>
                <h2>Thank you.</h2>
            </div>
            <div className='completeInfo'>
                <p>You will receive a payment confirmation and soon tracking information through email.</p>
                <p>Visit the Track Order page for estimated shipping times</p>
                <p>For all other inquiries about your order email: skylineculture@gmail.com</p>
            </div>
            <div className='homeButtonDiv'>
                <Link to={`/`}><button className='homeButton'>Return Home</button></Link>
            </div>
        </div>
    )
}