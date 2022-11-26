import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function BackButton () {
    const navigate = useNavigate();
    return(
        <div className='backButton' type="button" onClick={() => navigate(-1)}>Back</div>
    )
}