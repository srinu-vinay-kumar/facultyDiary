import {
  Modal,
  Button,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Form,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useState } from "react";

const ForgotPassword = () => {
  const [show, setShow] = useState("");
  const handleClose = () => setShow("");
  const handleShow = () => setShow(true);

  const [clgMail, setClgMail] = useState("");

  const setVal = async (e) => {
    e.preventDefault();
  };

  const sendLink = async (e) => {
    e.preventDefault();
    const res = await fetch("/sendpasswordlink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.status == 201) {
      setClgMail("");
      toast.success(`Password reset link sent successfully to your mail`);
    } else {
      toast.error("invalid user  ");
    }
  };

  return (
    <>
      <h4 onClick={handleShow}>Forgot Password</h4>

      <Modal show={show} onHide={handleClose} animation={true} centered>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form></Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Send Mail
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ForgotPassword;
