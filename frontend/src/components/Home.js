import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Button } from 'react-bootstrap';
import "./components.css"
const Home = () => {
    return(
        <div>
            <div className="content">
                <h1 className="heading">Welcome To</h1>
                <img src='/name.png' className="center"></img>
            </div>
            <div className = "justify_button">
                <Link to="/login"><Button>Log-In</Button></Link>
                <Link to="/register"><Button>Sign-Up</Button></Link>
                <Link to="/menu"><Button>Menu</Button></Link>
                <Link to="/about"><Button>About</Button></Link>
                <Link to="/contact"><Button>Contact</Button></Link>
            </div>
        </div>
    )
}

export default Home;