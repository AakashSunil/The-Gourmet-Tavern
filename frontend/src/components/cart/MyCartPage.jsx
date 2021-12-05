import React, { useEffect } from "react";
import { cart_list_create } from "../../helpers/helperFunctions";
import { cart_items } from "../../helpers/cart";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../../store/actions/cartActions";

const MyCartPage = () => {

  const isUser = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const token = localStorage.getItem('token');

  let isAdmin;
  isUser === null? isAdmin = false : isAdmin = isUser.isAdmin

  const dispatch = useDispatch();
  const cart_items = useSelector((state) => state.cart)

  let cartList = cart_items;
  const loop_items = (items) => {
    const cart_items = cart_list_create(items);
    return cart_items;
  };

  useEffect(() => {
    dispatch(getCartItems(token))
  },[dispatch,token])

  return <>{loop_items(cartList)}</>;
};

export default MyCartPage;
