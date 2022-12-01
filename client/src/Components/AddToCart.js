import React from 'react'
import { toast } from 'react-toastify';

export default function AddToCart(props){

    const notify = () => toast.success(`Item Added To Cart!`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

    return(
        <div className='addToCartBtn'>
            <button onClick={() => {props.addItemToCart(props.id, props.product, props.quantity, props.image, props.price, props.basePrice); notify()}} className='addToCart' type="button">Add to Cart</button>
        </div>
    )
}