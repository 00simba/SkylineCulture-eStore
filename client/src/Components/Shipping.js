import React from "react";
import '../Pages/App.css'



export default function Shipping(props){

    return(
        <div className="shippingDiv">
            {props.country === 'United States' && 
                <div className="usaDiv">
                    <span className="shippingSpan">Shipping Details</span>
                    <div className="shippingInfo">
                        <span>Method: USPS First Class Tracked </span>
                        <span>ETA: 3-5 business days</span>
                        <span>Flat Rate: $3.95</span>  
                    </div>   
                </div>
            }
            {props.country === 'Canada' && 
                <div className="canadaDiv">
                    <span className="shippingSpan">Shipping Details</span>
                    <div className="shippingInfo">
                        <span>Method: Canada Post Tracked</span>
                        <span>ETA: 2-8 business days</span>
                        <span>Flat Rate: $7.95</span>
                    </div>
                </div>  
            }
            {(props.country != 'Canada' && props.country != 'United States' && props.country != '' && props.country != undefined)  && 
                <div className="internationalDiv">      
                    <span className="shippingSpan">Shipping Details</span>
                    <div className="shippingInfo">
                        <span>Method: APC International Tracked </span>
                        <span>ETA: 7-14 business days</span>
                        <span>Flat Rate: $9.95</span>
                    </div>
                </div>  
            }
        </div>
    )
}
    
