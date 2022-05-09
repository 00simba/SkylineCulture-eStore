import React from 'react'
import CartPage from './CartPage'

export default function AddToCart(props){

    return(
        <div>
            <button onClick={() => props.addItemToCart(props.id, props.product, props.quantity, props.image, props.price, props.basePrice)} className='addToCart' type="button">Add to Cart</button>
        </div>
    )
}