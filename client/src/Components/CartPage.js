import React from 'react'
import Counter from './Counter'
import {Link} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactGA from 'react-ga'
import { useState, useEffect } from 'react';
import axios from 'axios';


function removeItem(setCartItems, cartItems, productId, productVariant){
    const objIndex = cartItems.findIndex((obj) => obj.productId === productId && obj.productVariant === productVariant)
    cartItems.splice(objIndex, 1)    
    setCartItems([...cartItems])
}

 function incrementItem(cartItems, productId, productVariant, setCartItems){
    cartItems.forEach(item => {
        if(item.productId === productId && item.productVariant === productVariant){
            var newQuantity = parseInt(item.productQuantity) + 1 ;
            item.productQuantity = newQuantity.toString()
        }
    })
    setCartItems([...cartItems])
}

function decrementItem(cartItems, productId, productVariant, setCartItems){
    cartItems.forEach(item => {
        if(item.productId === productId && item.productVariant === productVariant){
            if(item.productQuantity === "1"){
                setCartItems([...cartItems])
            }
            else{
                var newQuantity = parseInt(item.productQuantity) - 1 ;
                item.productQuantity = newQuantity.toString()
            }
        }
    })
    setCartItems([...cartItems])
} 


function getTotal(cartItems){
    var tempTotal=0
    cartItems.forEach(item => {
        tempTotal += parseFloat(item.salePrice) * parseInt(item.productQuantity)
    })
    return tempTotal
}


function getCount(cartItems) {
    var tempCount=0;
    cartItems.forEach((item) => {
        tempCount += parseInt(item.productQuantity)
    })
    return tempCount
}


export default function CartPage(props){

    const [quantity, setQuantity] = useState(1);
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState('USD');

    var cartItems = props.cartItems

    async function handleSubmit(){
        await axios.post("https://skylineculture-api.onrender.com/get-items", {cartItems})
        await axios.post("https://skylineculture-api.onrender.com/create-checkout-session")
        sessionStorage.clear()
    }

    

//    useEffect(() => {
//         async function fetchConfig() {
//           // Fetch config from our backend.
//           const {
//             unitAmount,
//             currency
//           } = await fetch('https://skylineculture-api.onrender.com/config').then(r => r.json());
//           setAmount(unitAmount);
//           setCurrency(currency);
//         }
//         fetchConfig();
//       }, []);

    useEffect(() => {
        ReactGA.pageview(window.location.pathname)
    }, [])

    var total = getTotal(props.cartItems)

    var itemCount = getCount(props.cartItems)

    const remove = () => toast.error('Item Removed From Cart', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

    const items = props.cartItems.map(item => {

        return(
            <div className="eachItemRow">
                <div className="itemInfos">
                    <h3><a href={`/product/${item.productUrl}`}>{item.productName}</a></h3>
                    <span>Price: <s>${(item.productPrice)}</s> <span className='salePrice'>${(item.salePrice)}</span></span>
                    <span>Quantity: {item.productQuantity}</span> 
                    {item.productVariant !='null' && item.productVariant !='Default' && <span>Color: {item.productVariant}</span>}
                </div>
                <div className="modifyItem">
                    <Counter add={() => incrementItem(props.cartItems, item.productId, item.productVariant, props.setCartItems)} quantity={item.productQuantity}  minus={() => decrementItem(props.cartItems, item.productId, item.productVariant, props.setCartItems)}/>
                    <button className="removeBtn" onClick={() => {removeItem(props.setCartItems, props.cartItems, item.productId, item.productVariant); remove()}}>Remove</button>
                </div>
                <div className="productImage">
                    <a href={`/product/${item.productUrl}`}><img src={require(`../Images/${item.productImage}`)}></img></a>
                </div>
            </div>
        )
    })
 
    const shortid = require('shortid');
    const id = shortid.generate();

    return(
        <div className='cartContainer'>
            <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Slide}
            limit={1}
            />
            <div className="cartDiv">
              <div className='cartInfo'>
                <h3 className='totalHeading'>Total: ${total.toFixed(2)}</h3>
                <h3>Item(s): {itemCount}</h3>
              </div>
              {!(props.cartItems.length) ? <p className='cartStatus'>Cart Empty</p> : <button onClick={() => handleSubmit()} className="checkoutBtn" role="link" type="submit">Checkout</button>}
            </div>
            {!(props.cartItems.length) ? <div className="contDiv">
                <span className='contMsg'>Your cart is currently empty. Click the button below to view some products.</span>
                <Link to={`/`}><button className='shopBtn'>Shop Now</button></Link>
            </div> :
            <div className="itemRow">
               {items}
            </div>}
        </div>
    )
}