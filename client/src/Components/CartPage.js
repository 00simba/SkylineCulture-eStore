import React from 'react'
import Counter from './Counter'
import {Link} from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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

    const empty = () => toast.error('Your Cart Is Empty', {
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
                    <h3>{item.productName}</h3>
                    <span>Quantity: {item.productQuantity}</span> 
                    <span>Price: ${(item.productPrice)}</span>
                </div>
                <div className="modifyItem">
                    <Counter add={() => incrementItem(props.cartItems, item.productId, props.setCartItems)} quantity={item.productQuantity}  minus={() => decrementItem(props.cartItems, item.productId, props.setCartItems)}/>
                    <button className="removeBtn" onClick={() => {removeItem(props.setCartItems, props.cartItems, item.productId); remove()}}>Remove</button>
                </div>
                <div className="productImage">
                    <img src={require(`../Images/${item.productImage}`)}></img>
                </div>
            </div>
        )
    })
 
    const shortid = require('shortid');
    const id = shortid.generate();

    return(
        <div>
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
            transition={Zoom}
            limit={1}
            />

            <div className="cartDiv">
              <h2>Total: ${total}</h2>
              {!(props.cartItems.length) ? <p className='cartStatus'>Cart Empty</p> :<Link to={`/checkout/${id}`}><button onClick={() => props.changeId(id)} className="checkoutBtn" type="button">Checkout</button></Link>}
            </div>
            <div className="itemRow">
               {items}
            </div>
        </div>
    )
}