import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { itemPerPage, item_filter } from "../../../Helpers/helperFunctions";
import { drinks_menu_item, food_menu_item } from "../../../Helpers/menu";
import { getProducts } from "../../../store/actions/productActions";
import DrinksMenuList from "../drinks/DrinksMenuList";
import FoodMenuList from "../food/FoodMenuList";
const Menu = (props) => {

  const isUser = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  let isAdmin;
  isUser === null? isAdmin = false : isAdmin = isUser.isAdmin

  const dispatch = useDispatch();
  const menu_items = useSelector((state) => state.product)
  let food_menu = props.type === "food" ? true : false;

  const [page, setPage] = useState(1);
  const [pageItemLimit, setPageItemList] = useState(6);
  let items = item_filter(menu_items, page, pageItemLimit);

  useEffect(() => {
    food_menu?
    dispatch(getProducts("food",0,50,"","","","")):
    dispatch(getProducts("drink",0,50,"","","",""))
  },[dispatch,food_menu])

  let pageItemLimitArray = itemPerPage(menu_items);

  const handlePage = (ele) => {
    setPage(ele);
    items = item_filter(menu_items, ele, pageItemLimit);
  };

  const handleItemPerPage = (ele) => {
    console.log(ele);
    setPage(1)
    setPageItemList(ele);
    items = item_filter(menu_items, page, ele);
  };


  return (
    <>
      {food_menu ? (
        <FoodMenuList
          isAdmin={isAdmin}
          isAuthenticated={isAuthenticated}
          items={items}
          full_item_list={menu_items}
          handlePage = {(val)=>handlePage(val)}
          handleItemPerPage = {(val) => handleItemPerPage(val)}
          page = {page}
          pageItemLimit = {pageItemLimit}
          pageItemLimitArray = {pageItemLimitArray}
        />
      ) : (
        <DrinksMenuList
          isAdmin={isAdmin}
          isAuthenticated={isAuthenticated}
          items={items}
          full_item_list={menu_items}
          handlePage = {(val)=>handlePage(val)}
          handleItemPerPage = {(val) => handleItemPerPage(val)}
          page = {page}
          pageItemLimit = {pageItemLimit}
          pageItemLimitArray = {pageItemLimitArray}
        />
      )}
    </>
  );
};

export default Menu;
