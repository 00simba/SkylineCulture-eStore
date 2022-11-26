import React from "react";

export default function Summary(props){
    console.log(props.cartItems)

    const items = props.cartItems.map(item => {
        return(
            <div>
                <div class="summaryItemsDiv">
                    <div class="summaryNames">
                        <span>{item.productName}</span>
                    </div>
                    <div class="summaryPriceQuantity">
                        <span>{item.productQuantity} x ${(item.productPrice)}</span> 
                    </div>
                </div>
            </div>
        )
    })


    return(
        <div className="summaryContainer">
            <h2>Order Summary</h2>
                {items}
         </div>
    )  
}
