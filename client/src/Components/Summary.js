import React from "react";

export default function Summary(props){

    var saving = 0.00;
    var shipping;
    var subTotal = 0;

    function getTotal(cartItems){
        var total = 0
        cartItems.forEach(item => {
            total += parseFloat(item.salePrice) * parseInt(item.productQuantity)
            saving += (parseFloat(item.productPrice) - parseFloat(item.salePrice)) * parseInt(item.productQuantity)
            subTotal += parseFloat(item.salePrice) * parseInt(item.productQuantity)
        })
        if(props.country === 'Canada'){
            shipping = 7.95
            total += 7.95
        }
        else if(props.country === "United States"){
            shipping = 3.95
            total += 3.95
        }
        else{
            shipping = 9.95
            total += 9.95
        }
        return total
    }

    var total = getTotal(props.cartItems)

    const items = props.cartItems.map(item => {
        return(
            <div>
                <div class="summaryItemsDiv">
                    <div class="summaryNames">
                        <p>{item.productName}</p> {item.productVariant !== 'null' && <p>&nbsp;-&nbsp;{ item.productVariant}</p>}
                    </div>
                    <div class="summaryPriceQuantity">
                        <span><s>${item.productPrice}</s> <span className="salePrice">${(item.salePrice)}</span> x {item.productQuantity}</span> 
                    </div>
                </div>
            </div>
        )
    })


    return(
        <div className="summaryContainer">
            <h2 className="summaryHeading">Order Summary</h2>
                {items}
            <div className='breakDown'>
                <div>Subtotal: ${subTotal.toFixed(2)}</div>
                <div>Shipping: ${shipping}</div>
                <div>Saving: <span className="salePrice">${saving.toFixed(2)}</span></div>
                <div className='totalCost'>Total: ${total.toFixed(2)} USD</div>
            </div>
         </div>
    )  
}
