import React, { useEffect } from "react";
import { ListGroup, Button, Col, Row, Image } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import "./Style.css";

function Cart({ cart, setCart , order, setOrder}) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Calculate the total price of the items in the cart
  const totalPrice = cart.reduce((total, currentItem) => {
    return total + currentItem.price * currentItem.quantity;
  }, 0);

  // Function to delete an item from the cart
  const deleteItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const handleCartOrder=()=>{
    
  }
  return (
    <div className="home">
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
            <Col md={2}>
              <small>Delete</small>
            </Col>
          </Row>
          <hr />
          {cart.map((item, index) => (
            <ListGroup.Item key={item._id}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={2}>{item.name}</Col>
                <Col md={2}>{item.quantity}</Col>
                <Col md={2}>{item.price}</Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => deleteItem(index)}
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>
          Total: ₹ {totalPrice}
        </span>
        <Button type="button" onClick={handleCartOrder} disabled={cart.length === 0}>
          <Link to="/checkout" style={{color:"black",textDecoration:"none"}}> 
          Proceed to Checkout
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Cart;
