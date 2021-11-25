import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Nav, Navbar, NavDropdown,  } from 'react-bootstrap';
// import LogIn from './LogIn';
// import SignUp from './SignUp';
// import ProductForm from './ProductForm';
// import MyCart from "./MyCart";

// import { logoutUser, getOrders } from '../actions';


const Header = () => { //(props) was removed

    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    // const user = useSelector(state => state.auth.user);
    // const order = useSelector(state => state.order);
    // //const token = useSelector(state => state.auth.token);
    // const token = localStorage.getItem('token');

    // const dispatch = useDispatch();

    // const [isOpen, setIsOpen] = useState(false);
    // const [redirect, setRedirect] = useState(false);
    // const toggle = () => setIsOpen(!isOpen);

    // const onClick = async () => {

    //     getOrders(dispatch, token);
    //     setRedirect(true);
        
    // }
    
    return (
        <div className="header">
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="/"><img src = "symbol.png" height="40px"/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <NavDropdown title="Menu" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/foodMenu">Food Menu</NavDropdown.Item>
                            <NavDropdown.Item href="/drinksMenu">Drinks Menu</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/contact">Contact</Nav.Link>

                    </Nav>
                    <Nav>
                        <Nav.Link href="/register">Sign Up / Register</Nav.Link>
                        <Nav.Link eventKey={2} href="/login">
                            Log In
                        </Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>    
        </div>
    )
}

export default Header;