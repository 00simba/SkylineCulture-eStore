import React from 'react'
import { toast } from 'react-toastify';

export default function AddToCart(props){

    const notify = () => toast.success(`Item Added! Click To View`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const warn = () => toast.warn(`Please Select An Option!`, {
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
            <button disabled={props.disabled} onClick={() => {
                if((props.variant !== null && Object.keys(props.variants[0]).length !== 0) || (props.variant === null && Object.keys(props.variants[0]).length === 0)){
                    notify()
                    props.addItemToCart(props.id, props.product, props.quantity, props.variant, props.image, props.price, props.url)
                }
                else{
                    warn()
                }}
            } className='addToCart' type="button">Add to Cart</button>
        </div>
    )
}