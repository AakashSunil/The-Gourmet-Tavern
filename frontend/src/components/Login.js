import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { setError, signInUser } from '../actions';
import { Login_Page } from '../Helpers/helperString';

export default function Login() {
    
    const history = useHistory();
    const error = useSelector(state => state.error);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const dispatch = useDispatch();
    
    const [msg, setMsg] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [errors, setErrors] = useState({});


    const handleEmailChange = e => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };

    const handleSubmit = e => {
        console.log("Login Button");
        e.preventDefault()
        if(!email.trim() || !password.trim()) {
            setError(dispatch, "All fields are required", 400, 'LOGIN_FAILURE');
        } else {
            signInUser(dispatch, email, password);
            history.push('/')
        } 
    }

    useEffect( () => {
        if(error.id === 'LOGIN_FAILURE') {
            setMsg(error.msg);
        }
        if(isAuthenticated) {
            dispatch({
                type : 'CLEAR_ERROR'
            });
        }
    }, [error, isAuthenticated,dispatch] )

    return(
        <div className="form_css">
            <h2 style={{marginBottom: '40px'}}>{Login_Page.HEADING}</h2>
            {msg ? <Alert color="danger">{msg}</Alert> : null}
            <Form onSubmit = { handleSubmit }>
                <Form.Group className="mb-3">
                    <Form.Label>{Login_Page.EMAIL}</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange = { handleEmailChange }/>
                </Form.Group>
                <Form.Group className="mb-3">
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