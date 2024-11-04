import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FormControl, Dropdown, Badge, Button } from "react-bootstrap";

function Navbar({ cart, setCart }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg p-3 mb-5 bg-dark rounded">
      <Link className="navbar-brand ml-2" to="/">
        Food App
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <FormControl
            style={{ width: 500 }}
            placeholder="Search a Product"
            className="m-auto"
          ></FormControl>
          {user ? (
            <>
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/myorder">
                My Order
              </Link>
            </li>
            <li className="nav-item">
            <Dropdown >
              <Dropdown.Toggle variant="success" style={{ width: 70}}>
                <FaShoppingCart color="white" fontSize="25px" style={{ marginRight: 7}} />
                <small className="success">{cart.length}</small>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ minWidth: 370 }}>
                {cart.length > 0 ? (
                  <>
                    {cart.map((prod) => (
                      <span className="cartitem" key={prod.id}>
                        <img
                          src={prod.image}
                          className="cartItemImg"
                          alt={prod.name}
                        />
                        <div className="cartItemDetail">
                          <span>{prod.name}</span>
                          <span>₹ {parseInt(prod.price)}</span>
                        </div>
                      </span>
                    ))}
                    <Link to="/cart">
                      <Button style={{ width: "95%", margin: "0 10px" }}>
                        Go To Cart
                      </Button>
                    </Link>
                  </>
                ) : (
                  <span style={{ padding: 10 }}>Cart is Empty!</span>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </li>
            </>
          ) : (
            <>
              <li className="nav-item active">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item active">
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              </li>
            </>
          )}
          
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
