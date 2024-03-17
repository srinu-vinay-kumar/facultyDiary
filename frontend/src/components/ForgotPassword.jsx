import {
  Modal,
  Button,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Form,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const ForgotPassword = () => {
  const [show, setShow] = useState("");
  const handleClose = () => setShow("");
  const handleShow = () => setShow(true);

  const [clgMail, setClgMail] = useState("");
  const [message, setMessage] = useState("");

  const setVal = async (e) => {
    setClgMail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();

    const res = await fetch("/sendpasswordlink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ clgMail }),
    });

    const data = await res.json();

    if (data.status == 201) {
      setClgMail("");
      // toast.success(`Password reset link sent successfully to your mail`);
      setMessage(true);
    } else {
      toast.error("Invalid user");
    }
  };

  return (
    <>
      <p onClick={handleShow} className="forgot">
        Forgot Password?
      </p>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        animation={true}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {message ? (
            <p style={{ color: "green", fontWeight: "bold" }}>
              Password reset link send successfully to your clg mail
            </p>
          ) : (
            ``
          )}

          <Form>
            <Form.Group className="mb-3" controlId="clgMail">
              <Form.Label>Enter your Mail ID</Form.Label>
              <Form.Control
                type="email"
                name="clgMail"
                value={clgMail}
                onChange={setVal}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={sendLink}>
            Send Mail
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ForgotPassword;
