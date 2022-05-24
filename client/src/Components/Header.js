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
  
                <Link to='/'>
                <div className='skylineLogo'><img src={logo}></img></div>
                </Link> 
                <ul class='menuItems'>
                    <Link to='/'><li>Home</li></Link>
                    <li>Keychains</li>
                    <li>Stickers</li>
                    <li>Diecast Cars</li>
                    <li>Track Order</li>
                </ul>  
                <Link to='/cart'>   
                    <div className='cartIcon'><img src={cart}></img></div>
                </Link> 
                 
            </div>
    )
}