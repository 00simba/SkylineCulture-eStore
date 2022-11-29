
import React, { useState, useEffect } from "react";
import StripeContainer from '../Components/StripeContainer';
import './App.css'
import Summary from '../Components/Summary'
import {Link} from 'react-router-dom';


export default function Payment(props){

    const shortid = require('shortid');
    const id = shortid.generate();


    return(
        <div className='App'>  
                <Link to={`/checkout/${id}`}><div className='backContainer'><div className='backButton' type="button" onClick={() => props.changeId(id)}>Back</div></div></Link>
                <div className='paymentWrapper'>
                    <h2 className='almostHeader'>Almost There</h2>
                    <div className='secureNote'>
                    <span>We will never save your card information and this checkout is secure.</span>
                    </div>
                    <div className="paymentInfo">
                        <StripeContainer/>  
                        <Summary cartItems={props.cartItems}/>
                    </div>
                </div>    
        </div>
    )
    
}
