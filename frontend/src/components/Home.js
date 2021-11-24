import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const history = useNavigate();
    return(
        <div>
            Home Component
        </div>
    )
}