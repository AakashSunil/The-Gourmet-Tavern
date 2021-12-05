const cartReducer = (state = [], action) => {
  switch(action.type) {
    
    case "GET_CART_ITEMS":
    return action.payload;
    
    case "ADD_TO_CART_ITEMS":
    return action.payload;
    
    default:
    return [...state];

  }
};

export default cartReducer;
