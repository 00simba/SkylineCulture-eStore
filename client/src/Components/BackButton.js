import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

export default function BackButton(){
    const navigate = useNavigate();
    return(
        <div>
            <button className="backButton" onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}