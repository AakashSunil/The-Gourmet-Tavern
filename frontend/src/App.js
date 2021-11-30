import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import {BrowserRouter as Router, Route}  from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import About from './components/About';
import Footer from './components/Footer';
import FoodMenuList from './components/FoodMenuList';
import DrinksMenuList from './components/DrinksMenuList';
import Register from './components/Register';
import Contact from './components/Contact';
import Menu from './components/Menu';
import { MyOrders } from './components/MyOrders';
import { AddDrinkItem } from './components/AddDrinkItem';
// import { loadUser } from './actions';
import { MyCart } from './components/MyCart';
import { AddFoodItem } from './components/AddFoodItem';
import { EditFoodItem } from './components/EditFoodItem';
import { EditDrinkItem } from './components/EditDrinkItem';

function App() {

  // const token = useSelector(state => state.auth.token);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   loadUser(dispatch, token);  
  // }, [dispatch,token]);


  return (
    <Router>
        <Header />
        <div className="App">
            <Route exact path='/'><Home /></Route>
            <Route exact path='/login'><Login /></Route>
            <Route exact path='/register'><Register /></Route>
            <Route exact path='/about'><About /></Route>
            <Route exact path='/contact'><Contact /></Route>
            <Route exact path='/Menu'><Menu /></Route>
            <Route exact path='/foodMenu'><FoodMenuList /></Route>
            <Route exact path='/drinksMenu'><DrinksMenuList /></Route>
            <Route exact path='/addDrinks'><AddDrinkItem /></Route>
            <Route exact path='/editDrinks'><EditDrinkItem /></Route>
            <Route exact path='/addFood'><AddFoodItem /></Route>
            <Route exact path='/editFood'><EditFoodItem /></Route>
            <Route exact path='/myOrders'><MyOrders /></Route>
            <Route exact path='/myCart'><MyCart /></Route>
        </div>
        <Footer />
    </Router>
  );
}

export default App;
