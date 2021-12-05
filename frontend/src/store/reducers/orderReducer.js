const orderReducer = (state = [], action) => {

  switch(action.type) {
    
    case "GET_ORDERS":
    return action.payload;
    
    default:
    return [...state];

  }
};

export default orderReducer;
