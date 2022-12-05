import React from 'react';
import './dropdown.css'
import { useEffect, useRef } from 'react';

export default function Dropdown(props){

 
    for(const [key, value] of Object.entries(props.options)){
        const [buttonVal, setButtonVal] = React.useState(key)
        return(
            <div>
                <div className='dropdownLabel'>
                    <span>{key.split(" ")[1]}</span>
                </div>
                <div class="dropdown">
                    <select id="dropbtn">
                        <option>{key}</option>
                        {value.map(option => {return (<option onClick={() => setButtonVal(option)} className='dropdownOption'>{option}</option>)})}
                    </select>
                </div> 
            </div> 
        )
    }
}