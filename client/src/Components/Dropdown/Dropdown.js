import React from 'react';
import './dropdown.css'

export default function Dropdown(props){
    for(const [key, value] of Object.entries(props.options)){
        const [buttonVal, setButtonVal] = React.useState(key)
        return(
            <div>
                <div className='dropdownLabel'>
                    <span>{key.split(" ")[1]}</span>
                </div>
                <div class="dropdown">
                    <button id="dropbtn">{buttonVal}</button>
                    <div class="dropdown-content">
                        {value.map(option => {return (<a onClick={() => setButtonVal(option)} className='dropdownOption'>{option}</a>)})}
                    </div>
                </div> 
            </div> 
        )
    }
}