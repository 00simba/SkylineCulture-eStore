import React from 'react'
import '../index.css'
import logo from '../logo.png'
import {Link} from 'react-router-dom';
import cart from '../Images/cart_icon.png'


export default function Header(){
    return(
            <div className='navbar'>
                
                <div id="menuToggle">

                    <input type="checkbox" />
             
                    <span></span>
                    <span></span>
                    <span></span>
            
                    <ul id="menu">
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