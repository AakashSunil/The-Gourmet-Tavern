import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore, { history } from './store';

import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();
class App extends Component {
  render() {
    return (
      <Provider store = { store }>
            <Router>
              <Navbar />
                <div className="container">
                  <Routes>
                    <Route exact path="/" element={ Home } />
                    <Route path="/register" element={ Register } />
                    <Route path="/login" element={ Login } />
                  </Routes>
                </div>
          </Router>
        </Provider>
    );
  }
}

export default App;