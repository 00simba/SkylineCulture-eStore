
import React, { useState, useEffect } from "react";
import StripeContainer from '../Components/StripeContainer';
import './App.css'
import Summary from '../Components/Summary'
import BackButton from '../Components/BackButton'


export default function Payment(props){


    return(
        <div className='App'>
            <div className='backContainer'><BackButton/></div>
            <h2 className='almostHeader'>Almost There</h2>
            <div className='secureNote'>
            <span>We will never save your card information and this checkout is secure.</span>
            </div>
            <div className="paymentInfo">
                <StripeContainer/>  
                <Summary cartItems={props.cartItems}/>
            </div>
            
        </div>
    )
    
}
