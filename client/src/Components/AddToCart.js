import React from 'react'

export default function AddToCart(props){

    return(
        <div className='addToCartBtn'>
            <button onClick={() => props.addItemToCart(props.id, props.product, props.quantity, props.image, props.price, props.basePrice)} className='addToCart' type="button">Add to Cart</button>
        </div>
    )
}