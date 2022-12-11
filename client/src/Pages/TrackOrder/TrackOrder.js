import axios from 'axios';
import React from 'react';
import './trackorder.css';


export default function TrackOrder(){

    const [orderID, setID] = React.useState('');

    const [shippingInfo, setInfo] = React.useState(null)

    function handleSubmit(e){
        e.preventDefault()
        axios.post("http://localhost:8080/get-tracking", {orderID : orderID}).then((res) => {setInfo(res.data.shipment)}).catch((err) => console.error(err))
    }

    return(
        <div className='trackingContainer'>
            <h2>Track Order</h2>
            <br/>
            <form>
                <input onChange={(e) => setID(e.target.value)} value={orderID} type='text' placeholder='Enter Order ID'></input>
            </form>
            <br/>
            <button onClick={(e) => handleSubmit(e)}>Track Order</button>
            <br/>
            {shippingInfo && <p>Postage: {shippingInfo.postage_description}</p>}
            <br/>
            {shippingInfo && <p>Tracking History</p>}
            <br/>
            {shippingInfo && shippingInfo.tracking_events.map((object) => {
                return <div>{object.created_at} - {object.title} - {object.location_description}</div>
            })}
        </div>
    )
}