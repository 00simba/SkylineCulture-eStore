import axios from 'axios';
import React from 'react';
import './trackorder.css';


export default function TrackOrder(){

    const [orderID, setID] = React.useState('');

    function handleSubmit(){
        console.log('here')
        axios.get(`https://chitchats.com/tracking/${orderID}.json`).then((res) => {
            console.log(res)
        }).catch((err) => console.log(err))
    }
    
    return(
        <div className='trackingContainer'>
            <h2>Track Order</h2>
            <br/>
            <form>
                <input onChange={(e) => setID(e.target.value)} value={orderID} type='text' placeholder='Enter Order ID'></input>
            </form>
            <br/>
            <button onClick={() => handleSubmit()}>Track Order</button>
        </div>
    )
}