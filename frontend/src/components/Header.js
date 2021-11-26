import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Nav, Navbar, NavDropdown,  } from 'react-bootstrap';
import { Header_NavBar } from '../Helpers/helperString';

import { logoutUser } from '../actions';


const Header = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
    // const order = useSelector(state => state.order);
    // //const token = useSelector(state => state.auth.token);
    const token = localStorage.getItem('token');

    const dispatch = useDispatch();
    
    return (
        <div className="header">
            <Navbar bg="light">
                <Container>
                    <Navbar.Brand href="/"><img src = "symbol.png" height="40px" alt="GT"/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">{Header_NavBar.HOME}</Nav.Link>
                        <Nav.Link href="/about">{Header_NavBar.ABOUT}</Nav.Link>
                        <NavDropdown title="Menu" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/foodMenu">{Header_NavBar.FOOD}</NavDropdown.Item>
                            <NavDropdown.Item href="/drinksMenu">{Header_NavBar.DRINK}</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/contact">{Header_NavBar.CONTACT}</Nav.Link>

                    </Nav>
                    {((token && isAuthenticated === null) || (isAuthenticated))?
                        <Nav>
                            {
                                <>
                                    <Nav.Link href="/myOrders">{Header_NavBar.ORDER}</Nav.Link>
                                    <Nav.Link onClick={()=>logoutUser(dispatch, user._id, token)}>{Header_NavBar.LOGOUT}</Nav.Link>
                                </>
                            }
                        </Nav>
                        :
                        <Nav>
                            <Nav.Link href="/register">{Header_NavBar.REGISTER}</Nav.Link>
                            <Nav.Link href="/login">{Header_NavBar.LOGIN}</Nav.Link>
                        </Nav>
                    }
                    </Navbar.Collapse>
                </Container>
            </Navbar>    
        </div>
    )
}

export default Header;