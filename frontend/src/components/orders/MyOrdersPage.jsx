import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { order_list_create } from "../../helpers/helperFunctions";
import { orders_list } from "../../helpers/orders";
import { getOrders } from "../../store/actions/orderActions";

const MyOrdersPage = () => {

  const isUser = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const token = localStorage.getItem('token');

  let isAdmin;
  isUser === null? isAdmin = false : isAdmin = isUser.isAdmin

  const dispatch = useDispatch();
  const order_items = useSelector((state) => state.order)

  let orderList = order_items;


  const loop_items = (items) => {
    const cart_items = order_list_create(items);
    return cart_items;
  };

  useEffect(() => {
    dispatch(getOrders(token))
  },[dispatch,token])

  return <>{loop_items(orderList)}</>;
};

export default MyOrdersPage;
