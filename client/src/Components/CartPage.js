import React from 'react'
import Counter from './Counter'
import {Link} from 'react-router-dom';


/*var itemsArray = []

    for(var i=0; i<cartItems.length; i++){
        var id = parseInt(cartItems[i].productId)
        var quantity = parseInt(cartItems[i].productQuantity)
        itemsArray.push({
            id: id,
            quantity: quantity
        })/*

    



    }

    /*console.log(itemsArray)*/


    /*fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                items: itemsArray
            }
        )
    }).then(res => {
        if(res.ok) return res.json()
        return res.json().then(json => Promise.reject(json))
    }).then(({url}) => {
        window.location = url
    }).catch(e => {
        console.error(e.error)
    })*/





function removeItem(setCartItems, cartItems, productId){
    cartItems.forEach(item => {
        if(item.productId === productId){
            cartItems.pop()
        }
    });
    setCartItems([...cartItems])
}

 function incrementItem(cartItems, productId ,setCartItems){
    cartItems.forEach(item => {
        if(item.productId === productId){
            var newQuantity = parseInt(item.productQuantity) + 1 ;
            item.productQuantity = newQuantity.toString()
        }
    })
    setCartItems([...cartItems])
}

function decrementItem(cartItems, productId, setCartItems){
    cartItems.forEach(item => {
        if(item.productId === productId){
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


export default function CartPage(props){


    const items = props.cartItems.map(item => {

        return(
            <div>
            <h2>{item.productName}</h2>
            <h2>{item.productQuantity}</h2> 
            <h2>${(item.productPrice) * (item.productQuantity)}</h2>
            <Counter add={() => incrementItem(props.cartItems, item.productId, props.setCartItems)} quantity={item.productQuantity}  minus={() => decrementItem(props.cartItems, item.productId, props.setCartItems)}/>
            <button className="removeBtn" onClick={() => removeItem(props.setCartItems, props.cartItems, item.productId)}>Remove</button>
            </div>
    
        )
    })


    return(
        <div>
            <div className="cartDiv">
              <h1 >Your Cart</h1>
            </div>
            <div className="itemRow">
                {items}
            </div>
            <Link to={`/checkout`}><button className="checkoutBtn" type="button">Checkout</button></Link>
        </div>
    )
}