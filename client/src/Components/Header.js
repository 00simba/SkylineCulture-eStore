import React from 'react'
import '../index.css'
import logo from '../logo.png'
import {Link} from 'react-router-dom';
import cart from '../Images/cart_icon.png'
import { useEffect, useRef } from 'react';


export default function Header(){

    const[isOpen, setOpen] = React.useState(false)

    let menuRef = useRef();

    useEffect(() => {
        let handler = (event) => {
            if(!menuRef.current.contains(event.target) && isOpen || (event.target.id === 'mobileLi')){
                document.getElementById('checkBox').click();
            }
        }
        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    })

    return(
            <div className='navbar'>  
       
                <div id='menuWrapper' ref={menuRef}>
                    <div id="menuToggle">
                        <input id="checkBox" type="checkbox" onClick={() => setOpen(!isOpen)}/>
                    
                        <span></span>
                        <span></span>
                        <span></span>
                
                        <ul id="menu" >
                            <Link to='/'><li id='mobileLi'>Home</li></Link>
                            <Link to="/keychains"><li id='mobileLi'>Keychains</li></Link>
                            <Link to="/stickers"><li id='mobileLi'>Stickers</li></Link>
                            <Link to="/diecast-cars"><li id='mobileLi'>Diecast Cars</li></Link>
                            <Link to="/track-order"><li id='mobileLi'>Track Order</li></Link>
                            <Link to="/contact-us"><li id='mobileLi'>Contact</li></Link>
                        </ul>
                    </div>
                </div>
      

                <div className='skylineLogo'>
                    <Link to='/'>
                        <img src={logo}></img>
                    </Link>
                </div>

                
               <ul className='menuItems'>
                    <Link to='/'><li>Home</li></Link>
                    <Link to='/keychains'><li>Keychains</li></Link>
                    <Link to='/stickers'><li>Stickers</li></Link>
                    <Link to='/diecast-cars'><li>Diecast Cars</li></Link>
                    <Link to='/track-order'><li>Track Order</li></Link>
                    <Link to='/contact-us'><li>Contact</li></Link>
                    <Link to='/cart'><li className='yourCartText'>Your Cart</li></Link>
                </ul>

                <div className='cartIcon'>
                    <Link to='/cart'><img src={cart}></img></Link>
                </div>

            </div>
    )
}