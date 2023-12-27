import React, { useEffect } from 'react';
import './ordercomplete.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import ReactGA from 'react-ga'
 
export default function OrderComplete(props){

    const [orderID, setID] = useState(null)

    useEffect(() => {
        ReactGA.pageview(window.location.pathname)
        if(sessionStorage.getItem('orderID')){     
            setID(sessionStorage.getItem('orderID'))        
        }
        else{
            var id = Math.floor(Math.random() * 9000 + 1000)
            setID(id)
            axios.post("https://skylineculture-api.onrender.com/remove-inventory").then((res) => console.log(res.data)).catch((err) => console.log(err))
            axios.post("https://skylineculture-api.onrender.com/save-items", {orderID : id}).then((res) => {console.log(res.data)})    
            localStorage.clear()
        } 
    }, []);
    
    useEffect(() => {
        sessionStorage.setItem('orderID', orderID);
    }, [orderID])

    return(
        <div className='completeContainer'>
            <div className='headingContainer'>
                <h2>Thank you for your purchase!</h2>
                <h2>{`Order: #${orderID}`}</h2>
            </div>
            <div className='completeInfo'>
                <p>Visit the Track Order page for estimated shipping times</p>
                <p>For all other inquiries about your order email: info@skylineculture.store</p>
            </div>
            <div className='homeButtonDiv'>
                <Link to={`/`}><button className='homeButton'>Return Home</button></Link>
            </div>
        </div>
    )
}