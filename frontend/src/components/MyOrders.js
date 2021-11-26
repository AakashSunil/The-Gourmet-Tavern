import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../actions';


export const MyOrders = () => {

    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    useEffect(() => {
        getOrders(dispatch, token);
    })
    return (
        <div>
            My Orders
        </div>
    )
}