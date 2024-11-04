import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListGroup, Button, Col, Row, Image } from "react-bootstrap";
import "./Style.css";

function Checkout({ cart, setCart }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user data from local storage

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Prevent rendering if the user is not present
  }

  const handleCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email, // Send user email
          cartItems: cart, // Send cart items
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        console.error(result.error);
      } else {
        alert("Order confirmed!"); // Show an alert box
        setCart([]);
        navigate("/"); // Redirect to home page on successful order
      }
    } catch (error) {
      console.error("Error confirming the order:", error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Order Confirmation</h1>
      <div className="productContainer">
        <ListGroup>
          <Row>
            <Col md={2}>
              <small>Image</small>
            </Col>
            <Col md={2}>
              <small>Name</small>
            </Col>
            <Col md={2}>
              <small>Quantity</small>
            </Col>
            <Col md={2}>
              <small>Price</small>
            </Col>
          </Row>
          <hr />
          {cart.map((item, index) => (
            <ListGroup.Item key={index}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={2}>{item.name}</Col>
                <Col md={2}>{item.quantity}</Col>
                <Col md={2}>{item.price}</Col>
              </Row>
            </ListGroup.Item>
          ))}
          <Row>
            <Button type="button" onClick={handleCart}>
              Confirm the Order
            </Button>
          </Row>
        </ListGroup>
      </div>
    </div>
  );
}

export default Checkout;
