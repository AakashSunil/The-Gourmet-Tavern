const cartReducer = (state = [], action) => {
  switch(action.type) {
    
    case "GET_CART_ITEMS":
    case "ADD_TO_CART_ITEMS":
    case "UPDATE_TO_CART_ITEMS":
    case "DELETE_FROM_CART_ITEMS":
    case "GET_ORDERS":
    case "ADD_ORDERS":
    return action.payload;
    default:
    return [...state];

  }
};

export default cartReducer;
