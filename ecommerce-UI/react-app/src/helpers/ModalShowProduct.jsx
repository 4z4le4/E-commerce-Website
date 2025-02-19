import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { clearCartsPay } from "../redux/actions/paymentAction";
import { Table } from "react-bootstrap";
import "./ModalShowProduct.css"
function ModalShowProduct(props) {
  const [show, setShow] = useState(true);
  const handleCloseModal = () => {
    setShow(false);
    dispatch(clearCartsPay());
    handleClose();
  };
  const dispatch = useDispatch();
  const { cartsPay, heading,handleClose } = props;
  return (
    <>
      <Modal show={show} onHide={handleCloseModal} className="modal-product">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "green" }}>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ height: "400px", overflow: "auto" }}>
            <Table striped bordered className="carts">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartsPay.map((cart, index) => (
                  <tr key={cart.id}>
                    <td>{cart.productDto.name}</td>
                    <td>
                      <img
                        src={`data:image/jpeg;base64,${cart.productDto.image}`}
                        alt={cart.productDto.name}
                        width="100"
                      />
                    </td>
                    <td style={{ color: "#670000", fontWeight: "700" }}>{cart.productDto.price}$</td>
                    <td>{cart.quantity}</td>
                    <td style={{ color: "#670000", fontWeight: "700" }}>{cart.productDto.price * cart.quantity}$</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseModal}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalShowProduct;
