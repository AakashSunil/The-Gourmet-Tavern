import axios from 'axios';
import { getConfig, setError } from './commonActions';

export const getCartItems = (token) => {
    return (dispatch) => {
        axios.get(`/cart`,{headers: getConfig(token).header})
        .then(res => {
            console.log(res);
            dispatch({
                type : 'CLEAR_ERROR'
            })

            dispatch({
                type : 'GET_CART_ITEMS',
                payload : res.data
            })
            
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'GET_CART_ITEMS_FAILURE');
        })
    }
}