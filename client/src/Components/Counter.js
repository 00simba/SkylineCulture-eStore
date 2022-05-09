import React from 'react'



export default function Counter(props){

    return(
        <div className='counter'>
            <button onClick={props.minus} className="minusButton">-</button>
            <span>{props.quantity}</span>
            <button onClick={props.add} className="addButton">+</button>
        </div>
    )
}