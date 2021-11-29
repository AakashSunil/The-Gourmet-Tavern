import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
import { cart_items } from '../Helpers/cart';
import { cart_list_create } from '../Helpers/helper_functions';

export const MyCart = () => {
    // const token = useSelector(state => state.auth.token);
    // const dispatch = useDispatch();

    const [cartList,setCartList] = useState(cart_items)

    const loop_items = (items) => {
        const cart_items = cart_list_create(items)
        return cart_items
    }

    // useEffect(() => {
    //     getOrders(dispatch, token);
    // },[cartList])
    
    return (
        <>
        {
            loop_items(cartList)
        }
        </>
    )
}
