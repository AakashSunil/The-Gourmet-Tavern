import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Menu_Page } from '../Helpers/helperString'

export default function Menu() {
    return(
        <>
            <div className="content">
                <h1>{Menu_Page.HEADING}</h1>
            </div>
            <div className = "justify_button">
                <Link to="/foodMenu"><Button size="lg">{Menu_Page.FOOD}</Button></Link>
                <Link to="/drinksMenu"><Button size="lg">{Menu_Page.DRINK}</Button></Link>
            </div>
        </>
    )
}
