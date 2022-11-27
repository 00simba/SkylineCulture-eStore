import React from 'react'
import { ReactNotifications, Store } from 'react-notifications-component'
import '../../node_modules/react-notifications-component/dist/theme.css'

export default function AddToCart(props){

    return(
        
        <div className='addToCartBtn'>
            <button onClick={() =>{ Store.addNotification({
                    message: "Item Added To Cart!",
                    type: "success",
                    insert: "top",
                    container: "bottom-center",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                    duration: 5000,
                    onScreen: true
                    }
                });                
                props.addItemToCart(props.id, props.product, props.quantity, props.image, props.price, props.basePrice)}} className='addToCart' type="button">Add to Cart</button>
        </div>
    )
}