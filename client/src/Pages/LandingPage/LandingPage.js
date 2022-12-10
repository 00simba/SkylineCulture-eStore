import React from 'react';
import Products from '../../Components/Product';

export default function LandingPage(props){

    const products = props.data.map(item => {
        return(
            <Products 
                key={item.id}
                id={item.id}
                title={item.title}
                item={item}  
            />
        )
    })

    return(
        <div className='parent'>
            {products}
        </div>
    )
}