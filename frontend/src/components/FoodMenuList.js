import React from 'react'
import { Link, Redirect } from "react-router-dom";
import { Button } from 'react-bootstrap';
export default function FoodMenuList() {
    return (
        <div id="About">
            <h4>Food Menu</h4>
            <p>
            Food Menu List
            </p>
            <div className="content">
                <img src='/name.png' className="center"></img>
            </div>
            <div className = "justify_button">
                <Link to="/login"><Button>Log-In</Button></Link>
                <Link to="/register"><Button>Sign-Up</Button></Link>
                <Link to="/menu"><Button>Menu</Button></Link>
                <Link to="/about"><Button>About</Button></Link>
            </div>
            <div className="content">
                <img src='/name.png' className="center"></img>
            </div>
            <div className = "justify_button">
                <Link to="/login"><Button>Log-In</Button></Link>
                <Link to="/register"><Button>Sign-Up</Button></Link>
                <Link to="/menu"><Button>Menu</Button></Link>
                <Link to="/about"><Button>About</Button></Link>
            </div>
            <div className="content">
                <img src='/name.png' className="center"></img>
            </div>
            <div className = "justify_button">
                <Link to="/login"><Button>Log-In</Button></Link>
                <Link to="/register"><Button>Sign-Up</Button></Link>
                <Link to="/menu"><Button>Menu</Button></Link>
                <Link to="/about"><Button>About</Button></Link>
            </div>
        </div>
    )
}
