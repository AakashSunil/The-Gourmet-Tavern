import React, { useState, useEffect } from 'react';
import {Form, Button, FormControl} from 'react-bootstrap';
import { useHistory } from 'react-router';

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
            <h2 style={{marginBottom: '40px'}}>Login to the Restaurant</h2>
            <Form onSubmit = { handleSubmit }>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange = { handleEmailChange }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control type= "password" placeholder = "Enter Password" value={password} onChange = { handlePasswordChange }/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}