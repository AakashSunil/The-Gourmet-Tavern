import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Menu() {
    return(
        <div>
            <div className="content">
                <h1>Choose Which Menu to Open:</h1>
            </div>
            <div className = "justify_button">
                <Link to="/foodMenu"><Button size="lg">Food Menu</Button></Link>
                <Link to="/drinksMenu"><Button size="lg">Drinks Menu</Button></Link>
                
            </div>
        </div>
    )
}
