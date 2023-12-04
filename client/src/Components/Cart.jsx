// Cart.js
import React from "react";

function Cart({ cart }) {
  cart && console.log("Cart in Cart component:", cart);

  return (
    
    <div>
      <h2>Cart</h2>

       cart.length === 0 && <p>Your cart is empty</p>

      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.name} - ₹{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
