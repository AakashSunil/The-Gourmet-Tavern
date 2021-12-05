import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { order_list_create } from "../../Helpers/helperFunctions";
import { orders_list } from "../../Helpers/orders";
import { getOrders } from "../../store/actions/orderActions";

const MyOrdersPage = () => {

  const error = useSelector(state => state.error)
  const isUser = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const token = localStorage.getItem('token');

  let isAdmin;
  isUser === null? isAdmin = false : isAdmin = isUser.isAdmin

  const dispatch = useDispatch();
  const order_items = useSelector((state) => state.order)

  let orderList = order_items;

  const [msg, setMsg] = useState(null);
  const [msgtype, setMsgType] = useState(null);

  const loop_items = (items) => {
    const cart_items = order_list_create(items);
    return cart_items;
  };

  useEffect(() => {
    if(error){
      if(error.id === 'GET_ORDER_FAILURE') {
        setMsg(error.msg.msg);
        setMsgType(error.msg.type)
      }
    }
    else {
      dispatch({
        type : 'CLEAR_ERROR'
    });
    dispatch(getOrders(token))

    }
  },[dispatch,token])

  return <>{loop_items(orderList)}</>;
};

export default MyOrdersPage;
