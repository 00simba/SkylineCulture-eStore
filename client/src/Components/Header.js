import React from 'react'
import '../index.css'
import logo from '../logo.png'
import {Link, useNavigate} from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';


export default function Header(){

    const [isOpen, setOpen] = React.useState(false)
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        if(!query.trim()) return;
        document.getElementById('checkBox').checked = false;
        navigate(`search-result?q=${encodeURIComponent(query.trim())}`);
        setQuery("");
    }


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
                        <input className='menu-check-box' id="checkBox" type="checkbox" onClick={() => setOpen(!isOpen)}/>
                    
                        <span></span>
                        <span></span>
                        <span></span>
                
                        <ul id="menu" >

                            <div className='mobile-search-container'>
                                    <form className='mobile-search-box' onSubmit={onSubmit}>
                                        <input type="text" className="mobile-search-input" name="query" value={query} onChange={(e) => setQuery(e.target.value)}></input>
                                        <button className='button mobile-search-button' type="submit">Search</button>
                                    </form>
                            </div>


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
                </ul>


                {
                
                /*
                
                <form className='search-box' onSubmit={onSubmit}>
                    <input type="text" className="search-input" name="query" value={query} onChange={(e) => setQuery(e.target.value)}></input>
                    <button className='button search-button' type="submit">Search</button>
                </form>
                */

                }
                

                <div className='cartIcon'>
                    <Link to='/cart'><img src='https://d38opoffv15p79.cloudfront.net/cart_icon.webp'></img></Link>
                </div>

            </div>
    )
}