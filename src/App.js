
import "./App.css";
import Home from "./components/Home/Home";
import React from "react";
import { BrowserRouter, BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Shop from "./components/Shop/Shop";
import BookDetail from "./components/BookDetail/BookDetail";
import Cart from "./components/Cart";
import About from "./components/About";
import CartContext from './context/CartContext';
import Login from './pages/Login/Login'
import LoginLayout from "./LoginLayout";
import HomeLayout from './HomeLayout'
import Register from "./pages/Register/Register";

function App (props) {
  return (
    <CartContext>
      <Router>
          <div className="App">
            <LoginLayout exact path='/login' component={Login} />
            <LoginLayout exact path='/register' component={Register} />
            <HomeLayout exact path="/" component={Home} />
            <HomeLayout exact path="/shop" component={Shop} />
            <HomeLayout exact path="/book/:id" component={BookDetail} />
            <HomeLayout exact path="/cart" component={Cart} />
            <Route exact path="/about" component={About} />
          </div>

      </Router>
    </CartContext>
  );
}

export default App;
