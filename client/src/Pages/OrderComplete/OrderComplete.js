import axios from 'axios';
import React, { useEffect } from 'react';
import './ordercomplete.css'

export default function OrderComplete(){

    return(
        <div className='completeContainer'>
            <div className='headingContainer'>
                <h2>Your order has been placed!</h2>
                <h2>Thank you.</h2>
            </div>
        </div>
    )
}