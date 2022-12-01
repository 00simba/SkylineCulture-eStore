import React from 'react'
import '../index.css'
import logo from '../logo.png'
import {Link} from 'react-router-dom';
import cart from '../Images/cart_icon.png'
import { useState, useEffect, useRef } from 'react';


export default function Header(){

    const [isOpen, setOpen] = useState(false)

    isOpen?(document.body.style.overflow) = "hidden" : document.body.style.overflow = "auto"
    isOpen?(document.body.style.pointerEvents) = "hidden" : document.body.style.pointerEvents = "auto" 

    return(
            <div className='navbar'>   
       
                <div id="menuToggle">
                    <input id="checkBox" type="checkbox" onClick={() => {setOpen(!isOpen);}}/>
                
                    <span></span>
                    <span></span>
                    <span></span>
            
                    <ul id="menu" >
                        <li>Home</li>
                        <li>Keychains</li>
                        <li>Stickers</li>
                        <li>Diecast Cars</li>
                        <li>Track Order</li>
                    </ul>
                </div>
      

                <div className='skylineLogo'>
                    <Link to='/'>
                        <img src={logo}></img>
                    </Link>
                </div>

                
               <ul className='menuItems'>
                    <Link to='/'><li>Home</li></Link>
                    <li>Keychains</li>
                    <li>Stickers</li>
                    <li>Diecast Cars</li>
                    <li>Track Order</li>
                    <Link to='/cart'><li className='yourCartText'>Your Cart</li></Link>
                </ul>

                <div className='cartIcon'>
                    <Link to='/cart'><img src={cart}></img></Link>
                </div>

            </div>
    )
}