import React, { useEffect } from 'react';
import './ordercomplete.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
 
export default function OrderComplete(){

    localStorage.clear()
    sessionStorage.clear()

    useEffect(() => {
        axios.post('https://skylineculture-api.onrender.com/send-receipt').then((res) => console.log(res)).catch((err) => console.error(err))
    }, [])

    return(
        <div className='completeContainer'>
            <div className='headingContainer'>
                <h2>Your order has been placed!</h2>
                <h2>Thank you.</h2>
            </div>
            <div className='completeInfo'>
                <p>You will receive a payment confirmation and tracking information email within 24 hours.</p>
                <p>Visit the Track Order page for estimated shipping times</p>
                <p>For all other inquiries about your order email: skylineculture@gmail.com</p>
            </div>
            <div className='homeButtonDiv'>
                <Link to={`/`}><button className='homeButton'>Return Home</button></Link>
            </div>
        </div>
    )
}