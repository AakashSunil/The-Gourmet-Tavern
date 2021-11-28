import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import "./components.css"
import { Home_Page } from '../Helpers/helperString';
const Home = () => {
    return(
        <div>
            <div className="content">
                <h1 className="heading">{Home_Page.GREETING}</h1>
                <img src='/name.png' className="center" alt="The Gourmet Tavern"></img>
            </div>
            {/* <div className = "justify_button">
                <Link to="/login"><Button>{Home_Page.LOGIN}</Button></Link>
                <Link to="/register"><Button>{Home_Page.REGISTER}</Button></Link>
                <Link to="/menu"><Button>{Home_Page.MENU}</Button></Link>
                <Link to="/about"><Button>{Home_Page.ABOUT}</Button></Link>
                <Link to="/contact"><Button>{Home_Page.CONTACT}</Button></Link>
            </div> */}
        </div>
    )
}

export default Home;