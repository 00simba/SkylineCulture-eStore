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

    const updated = () => toast.info(`Item Updated!`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    return(
        <div className='addToCartBtn'>
            <button onClick={() => {props.variant && props.addItemToCart(props.id, props.product, props.quantity, props.variant, props.image, props.price, props.basePrice); if(props.variant==null){warn()}else{notify()}}} className='addToCart' type="button">Add to Cart</button>
        </div>
    )
}