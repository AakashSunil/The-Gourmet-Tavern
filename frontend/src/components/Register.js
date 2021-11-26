import React, { useState } from 'react';
import {Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Register_Page } from '../Helpers/helperString';
import './components.css'
export default function Register() {

    const history = useHistory()
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
    // const [errors, setErrors] = useState({});

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
            <h2 style={{marginBottom: '40px'}}>{Register_Page.HEADING}</h2>
            <Form onSubmit = { handleSubmit }>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>{Register_Page.NAME}</Form.Label>
                    <Form.Control type="name" placeholder="Enter Name" value={name} onChange = { (e) => setName(e.target.value) } />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>{Register_Page.EMAIL}</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange = { (e) => setEmail(e.target.value) }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{Register_Page.MOBILE}</Form.Label>
                    <Form.Control type = "number" placeholder="Enter Mobile Number" value={phone} onChange = { (e) => setPhone(e.target.value) }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{Register_Page.ADDRESS}</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter Address" value={address} onChange = { (e) => setAddress(e.target.value) }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{Register_Page.PASSWORD}</Form.Label>
                    <Form.Control type= "password" placeholder = "Enter Password" value={password} onChange = { (e) => setPassword(e.target.value) }/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{Register_Page.CONFIRM}</Form.Label>
                    <Form.Control type= "password" placeholder = "Enter Password" value={password_confirm} onChange = { (e) => setPasswordConfirm(e.target.value) }/>
                </Form.Group>
                <div className="submission">
                    <Button variant="primary" type="submit">
                        {Register_Page.REGISTER}
                    </Button>
                    <Link to="/login" className="">{Register_Page.MESSAGE}</Link>
                </div>
            </Form>
        </div>
    )
}