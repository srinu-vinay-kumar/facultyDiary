/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Row, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlices";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import loginImage from "../assets/login-page.jpg";
import Header from "../components/Header";

const LoginScreen = () => {
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ empId, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/home");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Header />
      <Row>
        <Col>
          <FormContainer>
            <h1>Login</h1>
            <Row className="py-3">
              <Col>
                Doesn't have an account yet? <Link to="/register">Signup</Link>{" "}
              </Col>
            </Row>

            <Form onSubmit={submitHandler}>
              <Form.Group className="my-2" controlId="empId">
                <Form.Label>Employee Id</Form.Label>
                <Form.Control
                  type="string"
                  placeholder="1235"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {isLoading && <Loader />}

              <Button type="submit" variant="primary" className="mt-3">
                Login
              </Button>
            </Form>
          </FormContainer>
        </Col>
        <Col>
          <img src={loginImage} alt="Login Page" />
        </Col>
      </Row>
    </>
  );
};

export default LoginScreen;
