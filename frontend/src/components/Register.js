import React, { useState } from 'react';
import {Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { Link, } from 'react-router-dom';
import { signUpUser } from '../actions';
import { Register_Page } from '../Helpers/helperString';
import './components.css'
import { useDispatch } from 'react-redux';

export default function Register() {

    const dispatch = useDispatch();

    const history = useHistory()
    
    const [msg, setMsg] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
    const [errors, setErrors] = useState({});

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
        signUpUser(dispatch, name.trim(), email.trim(), phone.trim(), password.trim(), address.trim(), history);
        // if(!name.trim() || !email.trim() || !phone.trim() || !password.trim() || address.trim()) {

        //     setError(dispatch, "All fields are required", 400, 'REGISTRATION_FAILURE');
        // } 
        // //check if password meets all requirements
        // else if(!password.trim().match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {

        //     const message = "Password should be minimum of 8 characters & should include atleast 1 lowercase, 1 uppercase, 1 digit & 1 special character";
        //     setError(dispatch, message, 400, 'REGISTRATION_FAILURE');
        // }
        // //check if phone number meets all requirements 
        // else if(!phone.trim().match(/^[0-9]*$/) || !(phone.trim().length === 10)) {

        //     setError(dispatch ,"please enter a valid phone number", 400, 'REGISTRATION_FAILURE');
        // }
        // //check if name meets all requirements 
        // else if(!name.trim().match(/^[a-zA-Z\s]*$/)) {

        //     setError(dispatch, "Name should contain only letters", 400, 'REGISTRATION_FAILURE');
        // }
        // else if(name.trim().length < 3) {

        //     setError(dispatch, "Name should contain atleast 3 characters", 400, 'REGISTRATION_FAILURE');
        // }
        // //if all fields are valid
        // else {
        // }
        // history.push('/')
    }

    return(
        <div className="form_css">
            <h2 style={{marginBottom: '40px'}}>{Register_Page.HEADING}</h2>
            <Form onSubmit = { handleSubmit }>
                <Form.Group className="mb-3">
                    <Form.Label>{Register_Page.NAME}</Form.Label>
                    <Form.Control type="name" placeholder = {Register_Page.PLACEHOLDER_REGISTER_NAME} value={name} onChange = { (e) => setName(e.target.value) } />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>{Register_Page.EMAIL}</Form.Label>
                    <Form.Control type="email" placeholder = {Register_Page.PLACEHOLDER_EMAIL} value={email} onChange = { (e) => setEmail(e.target.value) }/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>{Register_Page.MOBILE}</Form.Label>
                    <Form.Control type = "number" placeholder = {Register_Page.PLACEHOLDER_MOBILE} value={phone} onChange = { (e) => setPhone(e.target.value) }/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>{Register_Page.ADDRESS}</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder = {Register_Page.PLACEHOLDER_ADDRESS} value={address} onChange = { (e) => setAddress(e.target.value) }/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>{Register_Page.PASSWORD}</Form.Label>
                    <Form.Control type= "password" placeholder = {Register_Page.PLACEHOLDER_PASSWORD} value={password} onChange = { (e) => setPassword(e.target.value) }/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>{Register_Page.CONFIRM}</Form.Label>
                    <Form.Control type= "password" placeholder = {Register_Page.PLACEHOLDER_CONFIRM_PASSWORD} value={password_confirm} onChange = { (e) => setPasswordConfirm(e.target.value) }/>
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