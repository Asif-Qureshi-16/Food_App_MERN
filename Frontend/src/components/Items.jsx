import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Items({ item, cart, setCart }) {
  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant] = useState(item.variants); // Initialize variant state
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCart = (item) => {
    const itemWithQuantity = { ...item, quantity }; // Add quantity to the item
    setCart([...cart, itemWithQuantity]);
    console.log([...cart, itemWithQuantity]);
  };
  return (
    <div className="card-item card" style={{ width: "19rem" }}>
      <img
        className="img-card card-img-top"
        src={item.image}
        alt="Card image cap"
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <div className="d-flex justify-content-between">
          <p>
            Variant:
            <h4 className="mt-2">{item.variants}</h4> {/* Use dynamic price */}
          </p>
          <p>
            Quantity:
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              id="quantity"
              className="form-select"
            >
              {[...Array(10).keys()].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </p>
        </div>
        <div className="price-container">
          <h6>&#8377; Price: {item.price * quantity}</h6> {/* Use dynamic price */}
        </div>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary" onClick={() => handleCart(item)}>
            Add to Cart
          </button>
          <Button variant="secondary" onClick={handleShow}>
            View Detail
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{item.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={item.image} className="modal-img" alt="" />
          <p>{item.desc}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Items;
