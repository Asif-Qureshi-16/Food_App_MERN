import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Container } from "react-bootstrap";
// import "./MyOrder.css"; // Import a custom CSS file for additional styling

function MyOrder() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/cart/myorder/${user._id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <Container className="my-order-container">
      {error && <p className="error-message">Error: {error}</p>}
      <h2 className="text-center my-4">My Orders</h2>
      {data.length > 0 ? (
        <Row>
          {data.map((order, index) => (
            <Col md={4} key={index} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{order.itemName}</Card.Title>
                  <Card.Text>
                    <strong>Quantity:</strong> {order.itemQuantity}
                  </Card.Text>
                  <Card.Text>
                    <strong>Price per Item:</strong> ₹{order.itemPrice}
                  </Card.Text>
                  <Card.Text>
                    <strong>Total Price:</strong> ₹{order.totalPrice}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center">No orders found.</p>
      )}
    </Container>
  );
}

export default MyOrder;
