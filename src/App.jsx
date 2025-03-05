// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Admin from "./pages/Admin";
import Footer from "./components/Footer";

function App() {
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const setUser = (user) => {
    if (user) {
      setToken(user.token);
      setIsAdmin(user.isAdmin);
    } else {
      setToken(null);
      setIsAdmin(null);
    }
  };

  return (
    <Router>
      <Header token={token} isAdmin={isAdmin} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart token={token} />} />
        <Route path="/payment" element={<Payment token={token} />} />
        <Route
          path="/admin"
          element={<Admin isAdmin={isAdmin} token={token} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
