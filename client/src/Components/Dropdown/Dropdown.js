import React from 'react';
import './dropdown.css'

export default function Dropdown(props){

    for(const [key, value] of Object.entries(props.options)){
        return(
            <div>
                <div className='dropdownLabel'>
                    <span>{key.split(" ")[1]}</span>
                </div>
                <div class="dropdown">
                    <select id="dropbtn" onChange={(event)=>{props.setSelected(event.target.value)}}>
                        <option>{key}</option>
                        {value.map(option => {return (<option value={option} className='dropdownOption'>{option}</option>)})}
                    </select>
                </div> 
            </div> 
        )
    }
}