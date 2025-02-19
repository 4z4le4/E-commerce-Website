import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { setMessage } from "../redux/actions/commonAction";
function ModalShowMessage(props) {
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    dispatch(setMessage(""));
  };
  const dispatch = useDispatch();
  const { content, heading } = props;
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title   style={{color:"green"}}>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalShowMessage;
