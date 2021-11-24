import { combineReducers } from 'redux';
import errorReducer from './errorReducer';

import { connectRouter } from 'connected-react-router'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  errors: errorReducer
})
export default createRootReducer;