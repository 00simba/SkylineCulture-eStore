import React from 'react';
import '../collections.css'
import Products from '../../Components/Product';

export default function Keychains(props){

    let found = false

    const products = (props.data).map(item => {
        if(item.collection === "Keychains"){
            found = true
            return(
                <Products 
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    item={item}  
                />
            )
        }
    })

    return(
    <div className='collectionContainer'>
        <div className='collectionHeader'>
            <h2>Shop Keychains</h2>
        </div>
        <div className='collectionItems'>
            {found ? products: <h2>Coming Soon!</h2>}
        </div>
    </div>)

}