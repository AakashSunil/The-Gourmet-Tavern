import React, { useEffect, useState } from "react";
import { cart_list_create } from "../../Helpers/helperFunctions";
import { cart_items } from "../../Helpers/cart";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../store/actions/cartActions";

const MyCartPage = () => {

  const error = useSelector(state => state.error)
  const isUser = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const token = localStorage.getItem('token');

  let isAdmin;
  isUser === null? isAdmin = false : isAdmin = isUser.isAdmin

  const dispatch = useDispatch();
  const cart_items_state = useSelector((state) => state.cart)
  const [msg, setMsg] = useState(null);
  const [msgtype, setMsgType] = useState(null);
  // let cartList = cart_items;
  let cartList = cart_items_state;
  const loop_items = (items) => {
    const cart_items = cart_list_create(items);
    return cart_items;
  };

  useEffect(() => {
    if(error){
      if(error.id === 'GET_CART_ITEMS_FAILURE') {
        setMsg(error.msg.msg);
        setMsgType(error.msg.type)
      }
    }
    else {
      dispatch({
        type : 'CLEAR_ERROR'
    });
    dispatch(getCartItems(token))

    }
    
  
  },[dispatch,token])

  return <>{loop_items(cartList)}</>;
};

export default MyCartPage;
