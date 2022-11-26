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
    const objIndex = cartItems.findIndex((obj) => obj.productId === productId)
    cartItems.splice(objIndex, 1)    
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


function getTotal(cartItems){
    var tempTotal=0
    cartItems.forEach(item => {
        tempTotal += parseInt(item.productPrice) * parseInt(item.productQuantity)
    })
    return tempTotal
}



export default function CartPage(props){

    var total = getTotal(props.cartItems)

    const items = props.cartItems.map(item => {

        return(
            <div className="eachItemRow">
                <div className="itemInfos">
                <h3>{item.productName}</h3>
                <span>Quantity: {item.productQuantity}</span> 
                <span>Price: ${(item.productPrice)}</span>
                </div>
                <div className="modifyItem">
                <Counter add={() => incrementItem(props.cartItems, item.productId, props.setCartItems)} quantity={item.productQuantity}  minus={() => decrementItem(props.cartItems, item.productId, props.setCartItems)}/>
                <button className="removeBtn" onClick={() => removeItem(props.setCartItems, props.cartItems, item.productId)}>Remove</button>
                </div>
                <div className="productImage">
                    <img src={require(`../Images/${item.productImage}`)}></img>
                </div>
            </div>
    
        )
    })


    return(
        <div>
            <div className="cartDiv">
              <h2>Total: ${total}</h2>
              <Link to={`/checkout`}><button className="checkoutBtn" type="button">Checkout</button></Link>
            </div>
            <div className="itemRow">
                {items}
            </div>
        </div>
    )
}