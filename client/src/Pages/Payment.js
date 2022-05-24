
import React, { useState, useEffect } from "react";
import StripeContainer from '../Components/StripeContainer';
import './App.css'


export default function Payment(props){

    return(
        <div className='App'>
            <div className='secureNote'>
            <span>We will never save your card information and this checkout is secure.</span>
            </div>
            <StripeContainer />  
        </div>
    )
    
}
