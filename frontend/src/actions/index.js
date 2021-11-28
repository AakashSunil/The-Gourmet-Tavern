import axios from 'axios';


export const setError = (dispatch, msg, status, id) => {
    dispatch({
        type : 'SET_ERROR',
        payload : {
            msg,
            status,
            id
        }
    });
}


export const signUpUser = (dispatch, name, email, phone, password, address, history) => {

    axios.post('/user/register',{name, email, phone, password, address})
        .then(res => {
            
            dispatch({
                type : 'CLEAR_ERROR'
            });
            dispatch({
                type: 'REGISTRATION_SUCCESS',
                payload: { ...res.data,
                    token : res.headers['auth-token']
                }
            });
            history.push('/');

        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'REGISTRATION_FAILURE');
            dispatch({
                type: 'REGISTRATION_FAILURE'
            });
        })
}

export const signInUser = (dispatch, email, password, history) => {

    axios.post('/user/login',{email, password})
        .then(res => {
            dispatch({
                type : 'CLEAR_ERROR'
            });
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { ...res.data,
                    token : res.headers['auth-token']
                }
            });
            history.push('/')
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'LOGIN_FAILURE');
            dispatch({
                type: 'LOGIN_FAILURE'
            });
        })
}

export const logoutUser = (dispatch, id, token) => {

    const headers = getConfig(token).header;

    axios.post('/user/logout', {id}, { headers : headers })
        .then(res => {
            dispatch({
                type : 'CLEAR_ERROR'
            });
            dispatch({
                type : 'LOGOUT_SUCCESS'
            });
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'LOGOUT_FAILURE');
            dispatch({
                type : 'LOGOUT_FAILURE'
            });
        })
}

export const loadUser = (dispatch, token) => {

    const headers = getConfig(token).header;

    console.log(headers);
    axios.get('/user', {headers : headers})
        .then(res => {
            console.log(res);
            dispatch({
                type : 'CLEAR_ERROR'
            });
            dispatch({
                type : 'USER_LOADED',
                payload : {
                    ...res.data,
                    token : token
                }
            });
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'AUTH_FAILURE');
            dispatch({
                type : 'AUTH_FAILURE'
            });

        })
}

export const getConfig = (token, contentType='application/json') => {
    const config = {
        header : {
            'Content-Type' : contentType
        }
    }
    if(token) {
        config.header['auth-token'] = token;
    }
    return config;
}

export const getOrders = (dispatch, token) => {
   
    axios.get('/orders', {headers: getConfig(token).header})
        .then(res => {
            
            dispatch({
                type : 'CLEAR_ERROR'
            })

            dispatch({
                type : 'GET_ORDERS',
                payload : res.data
            })
            
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'ORDER_FAILURE');
        })
}