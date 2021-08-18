import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { CartContext } from "../../context/CartContext";
import BookLogo from '../../book_logo.jpg'
import getDataLogin from "../../utils/getDataLogin";

function Navbar(props) {
  const { cartItems } = useContext(CartContext);
  const dataLogin = getDataLogin()
  console.log(dataLogin)
  return (
    (
      <nav id="navbar">
        <div class="navbar-title d-flex justify-content-center align-items-center">
          <img src={BookLogo} width='64'></img>
          <Link to="/">
            <div >
              <p style={{fontSize: 15}}>Course Academy</p>
            </div>
          </Link>
        </div>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/shop">
            <li>Shop</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          {dataLogin != null ? (

            <Link to="/cart">
            <li>Profile</li>
          </Link>

          ) : <Link to="/login">
            <li>Login</li>
          </Link>
          }
          
        </ul>
      </nav>
    )
  );
}

export default Navbar