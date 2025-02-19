import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { setError } from "../redux/actions/commonAction";
function ModalShowError(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    dispatch(setError(""));
  };
  const dispatch = useDispatch();
  const { content, heading } = props;
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title  style={{color:"red"}}>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalShowError;
