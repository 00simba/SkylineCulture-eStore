import React from 'react'
import Counter from './Counter'
import {Link} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        tempTotal += parseInt(item.productPrice) * parseInt(item.productQuantity)
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
                    <h3><a href={`#/product/${item.productUrl}`}>{item.productName}</a></h3>
                    <span>Price: ${(item.productPrice)}</span>
                    <span>Quantity: {item.productQuantity}</span> 
                    {item.productVariant !='null' && item.productVariant !='Default' && <span>Color: {item.productVariant}</span>}
                </div>
                <div className="modifyItem">
                    <Counter add={() => incrementItem(props.cartItems, item.productId, item.productVariant, props.setCartItems)} quantity={item.productQuantity}  minus={() => decrementItem(props.cartItems, item.productId, item.productVariant, props.setCartItems)}/>
                    <button className="removeBtn" onClick={() => {removeItem(props.setCartItems, props.cartItems, item.productId, item.productVariant); remove()}}>Remove</button>
                </div>
                <div className="productImage">
                    <a href={`#/product/${item.productUrl}`}><img src={require(`../Images/${item.productImage}`)}></img></a>
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
                <h3 className='totalHeading'>Total: ${total}</h3>
                <h3>Item(s): {itemCount}</h3>
              </div>
              {!(props.cartItems.length) ? <p className='cartStatus'>Cart Empty</p> :<Link to={`/checkout/${id}`}><button onClick={() => props.changeId(id)} className="checkoutBtn" type="button">Checkout</button></Link>}
            </div>
            {!(props.cartItems.length) ? <div className="contDiv">
                <span className='contMsg'>Your cart is currently empty, click the button below to view some products!</span>
                <Link to={`/`}><button className='shopBtn'>Shop Now</button></Link>
            </div> :
            <div className="itemRow">
               {items}
            </div>}
        </div>
    )
}