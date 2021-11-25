import React, { useState, useEffect } from 'react';
import {Form, Button, FormControl} from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Login_Page } from '../Helpers/helperString';

export default function Login() {
    
    const history = useHistory()
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});


    const handleEmailChange = e => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault()
        const user = {
            email: email,
            password: password,
        }
        console.log(user);
        history.push('/')
    }

    return(
        <div className="form_css">
            <h2 style={{marginBottom: '40px'}}>{Login_Page.HEADING}</h2>
            <Form onSubmit = { handleSubmit }>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>{Login_Page.EMAIL}</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange = { handleEmailChange }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{Login_Page.PASSWORD}</Form.Label>
                    <Form.Control type= "password" placeholder = "Enter Password" value={password} onChange = { handlePasswordChange }/>
                </Form.Group>
                <div className="submission">
                    <Button variant="primary" type="submit">{Login_Page.LOGIN}</Button>
                    <Link to="/register" className="">{Login_Page.MESSAGE}</Link>
                </div>
            </Form>
        </div>
    )
}