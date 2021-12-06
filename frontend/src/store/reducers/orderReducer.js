const orderReducer = (state = [], action) => {

  switch(action.type) {
    
    case "GET_ORDERS":
    case "ADD_ORDERS":
    return action.payload;
    
    default:
    return [...state];

  }
};

export default orderReducer;
