import React from 'react'
import './pagenotfound.css'
import { Link } from 'react-router-dom'
import ReactGA from 'react-ga'
import { useEffect } from 'react'


export default function PageNotFound(){

    useEffect(() => {
        ReactGA.pageview(window.location.pathname)
    }, [])

    return(
        <div className='notFoundContainer'>
            <h1>Page Not Found</h1>
            <div className='messageDiv'>
                <span>The page you are looking for does not exist.</span>
                <span>Click the button below to return home.</span>
            </div>
            <div className='homeButtonDiv'>
                <Link to={`/`}><button className='homeButton'>Return Home</button></Link>
            </div>
        </div>
    )
}