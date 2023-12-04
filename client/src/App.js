import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./Components/Cart";
import ProductList from "./Components/ProductList";
// import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);

  //function to be passed as prop
  const addItemToCart = (item)=> {
    setCart(prev=> [...prev, item]);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductList addItemToCart={addItemToCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart cart={cart} />} />

      </Routes>
    </div>
  );

}

export default App;

