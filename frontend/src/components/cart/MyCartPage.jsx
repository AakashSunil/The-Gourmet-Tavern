import React, { useEffect, useState } from "react";
import { cart_list_create } from "../../helpers/helperFunctions";
// import { cart_items } from "../../helpers/cart";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../store/actions/cartActions";
import { Alert } from "react-bootstrap";

const MyCartPage = () => {

  const error = useSelector(state => state.error)
  // const isUser = useSelector(state => state.auth.user);
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const token = localStorage.getItem('token');

  // let isAdmin;
  // isUser === null? isAdmin = false : isAdmin = isUser.isAdmin

  const dispatch = useDispatch();
  const cart_items_state = useSelector((state) => state.cart.length!==0?state.cart.items:[])
  const cart_bill = useSelector((state) => state.cart.length!==0?state.cart.totalBill:[])
  const [msg, setMsg] = useState(null);
  const [msgtype, setMsgType] = useState(null);
  // let cartList = cart_items;
  let cartList = cart_items_state;
  const loop_items = (items) => {
    console.log(items);
    const cart_items = cart_list_create(items,cart_bill);
    return cart_items;
  };

  useEffect(() => {
    // if(error.status !== null){
    //   if(error.id === 'GET_CART_ITEMS_FAILURE') {
    //     setMsg(error.msg);
    //     setMsgType(error.msg)
    //   }
    // }
    // else {
    //   dispatch({
    //     type : 'CLEAR_ERROR'
    // });
    // dispatch(getCartItems(token))

    // }
    dispatch(getCartItems(token))
    
  
  },[dispatch,token])

  return <>{msgtype !== null && (
    <Alert color="danger" variant={"danger"}>
      {msg}
    </Alert>
  )}{loop_items(cartList)}</>;
};

export default MyCartPage;
