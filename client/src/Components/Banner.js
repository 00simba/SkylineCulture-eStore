import React from 'react'

export default function Banner(){
    return(
        <div className='bannerContainer'>
        <div className='bannerImage'>
            <img src={require(`./../Images/R34.png`)}></img>
        </div>
        <div className='bannerContent'>
        <img src={require(`./../Images/overlay.png`)}></img>
        </div>
    </div>
    )
}