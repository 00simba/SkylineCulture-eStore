import React from 'react'
import {Link} from 'react-router-dom'
import ReactStars from 'react-stars'

export default function Product(props){

    const linkStyle = {
        textDecoration: "none",
        color: "black"
    }

    const productReview = {
        size: 20,
        value: props.item.stars,
        edit: false,
        color2: "#FFB800"
    }

    return(
        <Link className='productLink' to={`/product/${props.item.url}`} style={linkStyle} >
            <div className="card">
                <img className="productpic" src={require(`../Images/${props.item.img[0]}`)}></img>
                <h4>{props.item.title}</h4>
                <div className='homeStars'><ReactStars {... productReview}/></div>
                <div className='cardPriceDiv'><h3 className="prices"><s>${props.item.price}</s></h3><h3 className="salePrice">${props.item.sale_price}</h3></div>
            </div>
        </Link>
    )
}