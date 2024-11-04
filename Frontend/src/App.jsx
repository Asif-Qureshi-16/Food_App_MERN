import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import Signup from './components/Signup';
import Login from './components/Login';
import Checkout from './components/Checkout';
import MyOrder from './components/MyOrder';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(''); // Initialize as a string
  const [cart, setCart] = useState(getLocalCartData());
  // Function to fetch items from the API
  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/items/getAllItem');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    }
  };

  // Function to get cart data from local storage
  function getLocalCartData() {
    const newCartData = localStorage.getItem('cart');
    return newCartData ? JSON.parse(newCartData) : [];
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchInfo();
  }, []);
  

  // Update local storage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Update local storage when cart changes

  return (
    <BrowserRouter>
      <Navbar cart={cart} setCart={setCart} />
      <div>
        <Routes>
          <Route exact path="/" element={<Home data={data} cart={cart} setCart={setCart}  />} />
          <Route exact path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route exact path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
          <Route exact path="/myorder" element={<MyOrder />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
