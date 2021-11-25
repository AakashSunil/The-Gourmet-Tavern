import React, { useState, useEffect } from 'react';
import {Form, Button, FormControl} from 'react-bootstrap';
import { useHistory } from 'react-router';
import './components.css'
export default function Register() {

    const history = useHistory()
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
    const [errors, setErrors] = useState({});


    const handleNameChange = e => {
        setName(e.target.value);
    };

    const handleEmailChange = e => {
        setEmail(e.target.value);
    };

    const handlePhoneChange = e => {
        setPhone(e.target.value);
    };

    const handleAddressChange = e => {
        setAddress(e.target.value);
    };

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };

    const handlePasswordConfirmChange = e => {
        setPasswordConfirm(e.target.value);
    };


    const handleSubmit = e => {
        e.preventDefault()
        const user = {
            name: name,
            email: email,
            phone: phone,
            address: address,
            password: password,
            password_confirm: password_confirm
        }
        console.log(user);
        history.push('/')
    }

    return(
        <div className="form_css">
            <h2 style={{marginBottom: '40px'}}>New User Registration</h2>
            <Form onSubmit = { handleSubmit }>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter Name" value={name} onChange = { handleNameChange } />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange = { handleEmailChange }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type = "number" placeholder="Enter Mobile Number" value={phone} onChange = { handlePhoneChange }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter Address" value={address} onChange = { handleAddressChange }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control type= "password" placeholder = "Enter Password" value={password} onChange = { handlePasswordChange }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type= "password" placeholder = "Enter Password" value={password_confirm} onChange = { handlePasswordConfirmChange }/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register User
                </Button>
            </Form>
        </div>
    )
}