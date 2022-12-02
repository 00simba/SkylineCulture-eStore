import React from 'react'
import {Link} from 'react-router-dom'

export default function Product(props){

    const linkStyle = {
        textDecoration: "none",
        color: "black"
    }

    return(
        <Link className='productLink' to={`/product/${props.item.url}`} style={linkStyle} >
            <div className="card">
                <img className="productpic" src={require(`../Images/${props.item.img}`)}></img>
                <h4>{props.item.title}</h4>
                <h3 className="prices">${props.item.price}</h3>
            </div>
        </Link>
    )
}