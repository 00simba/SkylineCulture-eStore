import React, { useEffect } from 'react';
import './ordercomplete.css'
import { Link, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import ReactGA from 'react-ga'
import { Ellipsis } from 'react-css-spinners'
 
export default function OrderComplete(props){

    const [name, setName] = useState('')
    const [orderID, setID] = useState(null)
    const [searchParams] = useSearchParams();

    useEffect(() => {
        ReactGA.pageview(window.location.pathname)
        //https://skylineculture-api.onrender.com
        axios.post("https://skylineculture-api.onrender.com/order-complete", {session_id: searchParams.get("session_id")}).then((res) => {
            setName(res.data.name.split(' ')[0])
            //axios.post("https://skylineculture-api.onrender.com/save-items", {session_id: searchParams.get("session_id")}).then((res) => {}).catch((err) => console.log(err))  
            axios.post("https://skylineculture-api.onrender.com/remove-inventory", {session_id: searchParams.get("session_id")}).then((res) => console.log(res.data)).catch((err) => console.log(err))
            localStorage.clear()
        }).catch((err) => {
            console.log(err)
            window.location.href = 'https://skylineculture.com/not-found';
        })
    }, [name]);
    
    return(

        <div className='completeContainer'>
        {name && orderID ? 
            <>
            <div className='headingContainer'>
                <h2>Thank you for your order {name}!</h2>
                <h2>{`Order: #${orderID}`}</h2>
            </div>
            <div className='completeInfo'>
                <p>Visit the Track Order page for estimated shipping times</p>
                <p>For all other inquiries about your order email: info@skylineculture.com</p>
            </div>
            <div className='homeButtonDiv'>
                <Link to={`/`}><button className='homeButton'>Return Home</button></Link>
            </div>
            </>
            :
            <>
            <Ellipsis color="#000000" size={60} thickness={3} />
            </>
        }
        </div>

    )
}