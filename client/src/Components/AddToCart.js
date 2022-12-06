import React, {useEffect} from 'react'
import { toast } from 'react-toastify';

export default function AddToCart(props){



    const notify = () => toast.success(`Item Added! View Here`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const warn = () => toast.warn(`Please Select An Option!`, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
    });

    function checkItems(){
        if((props.variant != null && Object.keys(props.variants[0]).length != 0) || (props.variant == null && Object.keys(props.variants[0]).length == 0)){
            notify();
            props.addItemToCart(props.id, props.product, props.quantity, props.variant, props.image, props.price)
        }
        else{
            warn()
        }
    }

    return(
        <div className='addToCartBtn'>
            <button onClick={() => {
                if((props.variant !== null && Object.keys(props.variants[0]).length !== 0) || (props.variant === null && Object.keys(props.variants[0]).length === 0)){
                    notify();
                    props.addItemToCart(props.id, props.product, props.quantity, props.variant, props.image, props.price)
                }
                else{
                    warn()
                }}
            } className='addToCart' type="button">Add to Cart</button>
        </div>
    )
}