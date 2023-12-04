import React, { useState } from "react";
import { data } from "../data";
import Cart from "./Cart";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../pages/Navbar";

function ProductList({cart, addItemToCart}) {
  const [search, setSearch] = useState("");
  // const [cart, setCart] = useState([]);

  const [showCart, setShowCart] = useState(false);

  const addToCart = (item) => {
    // setCart((prevCart) => [...prevCart, item]);

    addItemToCart(item);
    console.log("Cart after adding item:", cart);
  };

  const toggleCart = () => {
    setShowCart(!showCart);
    // navigate("/cart");
  };

  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:5000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  return (
    <div>
      <Navbar username={username} onLogout={Logout} cart={cart} />
      <form className="d-flex" role="search" style={{ width: "50%" }}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      <button className="btn btn-outline-secondary mt-3" onClick={toggleCart}>
        View Cart ({cart.length})
      </button>

      {showCart && (
        <div className="cart-container">
          <Cart cart={cart} />
        </div>
      )}

      <div
        className="row row-cols-1 row-cols-md-3"
        style={{ marginTop: "20px", maxWidth: "1200px", margin: "auto" }}
      >
        {data
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.name.toLowerCase().includes(search);
          })
          .map((item, index) => (
            <div className="col mb-4" key={index}>
              <div className="card h-100">
                <img
                  src={item.img}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">
                    <b>{item.name}</b>
                  </h5>
                  <p className="card-text">{item.description}</p>
                  <p>Price: ₹{item.price}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="btn btn-outline-secondary"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ProductList;
