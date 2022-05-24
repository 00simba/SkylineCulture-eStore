import React from "react";



export default function Shipping(props){

    return(
        <div>
            {props.country === 'United States' && 
                <div>
                    <br/>
                    <span>Shipping</span>
                    <br/>
                    <span>USA Tracked 3-5 business days: $3.95</span>
                    <br/>
                </div>
            }
            {props.country === 'Canada' && 
                <div>
                    <br/>
                    <span>Shipping</span>
                    <br/>
                    <span>Canada Tracked 2-8 business days: $7.95</span>
                    <br/>
                </div>  
            }
            {(props.country != 'Canada' && props.country != 'United States' && props.country != '' && props.country != undefined)  && 
                <div>
                    <br/>
                    <span>Shipping</span>
                    <br/>
                    <span>International Tracked 7-14 business days: $9.95</span>
                    <br/>
                </div>  
            }
        </div>
    )
}
    
