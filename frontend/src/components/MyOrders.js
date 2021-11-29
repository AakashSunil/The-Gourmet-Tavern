import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
import { order_list_create } from '../Helpers/helper_functions';
import { orders_list } from '../Helpers/orders';


export const MyOrders = () => {

    // const token = useSelector(state => state.auth.token);
    // const dispatch = useDispatch();

    const [orderList,setOrderList] = useState(orders_list)
    
    // useEffect(() => {
    //     getOrders(dispatch, token);
    // },[orderList])

    const loop_items = (items) => {
        const cart_items = order_list_create(items)
        return cart_items
    }

    return (
        <>
        {
            loop_items(orderList)
        }
        </>
    )
}