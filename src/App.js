
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar";
import React from "react";
import { useReducer } from "react";
import { BrowserRouter, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Shop from "./components/Shop/Shop";
import BookDetail from "./components/BookDetail/BookDetail";
import Cart from "./components/Cart";
import About from "./components/About";
import CartContext from './context/CartContext'

function App (props) {
  return (
    <CartContext>
      <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/shop">
              <Shop />
            </Route>
            <Route exact path="/book/:id">
              <BookDetail />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Footer class='footer' id="footer"/>
          </div>

      </Router>
    </CartContext>
  );
}

export default App;
