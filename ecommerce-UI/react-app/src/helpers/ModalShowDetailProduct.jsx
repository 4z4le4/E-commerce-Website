import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { clearCartsPay } from "../redux/actions/paymentAction";
import { Card, Table } from "react-bootstrap";
function ModalShowDetailProduct(props) {
  const [show, setShow] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const handleCloseModal = () => {
    setShow(false);
    addToCart(product.id, quantity)
    handleClose();
  };
  const handleCloseModal1 = () => {
    setShow(false);
    
    handleClose();
  };
  //   const dispatch = useDispatch();
  const { product, heading, handleClose, addToCart } = props;
  return (
    <>
      <Modal show={show} onHide={handleCloseModal1} className="modal-product-1">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "green" }}>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="row align-items-top">
          <div className="col-md-6 col-xl-4 p-3" key={product.id + "@"}>
            <Card className="my-detail-card">
              <Card.Img
                variant="top"
                className="detail-img"
                src={`data:image/jpeg;base64,${product.image}`}
              />
              <Card.Body>
                <Card.Title style={{fontWeight:"700"}}>{product.name}</Card.Title>

                <Card.Text className="price" style={{color:"#670000",fontWeight:"700"}}>{product.price}$</Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-xl-8 col-md-6 row">
            <div className="col-12">
              <h2>Description</h2>
              <p>{product.description}</p>
              <p style={{fontWeight:"700",color:"green"}}>Available: {product.quantity}</p>
            </div>
            <div className="col-12 row">
              <div className="col-6 d-flex justify-content-end align-items-center">
                <input
                  type="number"
                  defaultValue={quantity}
                  onChange={(event) => {
                    setQuantity(event.target.value);
                  }}
                  style={{
                    width: "100%",
                    padding: "5px 10px",
                    fontSize: "14px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    boxSizing: "border-box",
                    textAlign:"center"
                  }}
                />
              </div>
              <div className="col-6 d-flex justify-content-end align-items-center">
                <button
                  className="add-to-cart "
                  onClick={() => 
                 handleCloseModal()
                }
                  style={{minWidth:"150px"}}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Ok
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default ModalShowDetailProduct;
