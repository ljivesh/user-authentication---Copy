import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ricebowl from "../images/gif-rice.gif";
import Cart from "../Components/Cart";

function Navbar({ username, onLogout, cart }) {
  const [isCartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCart = () => {
    setCartOpen(!isCartOpen);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={ricebowl} style={{ height: "40px" }} alt="logo" />
            Meal-Co
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Hi {username}
                </Link>
              </li>

              <li className="nav-item">
                <button className="nav-link" onClick={() => navigate("/cart")}>
                  Cart ({cart.length})
                </button>
              </li>

              <li>
                <button onClick={onLogout} className="btn btn-outline-success">
                  LOGOUT
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
