// packages import
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Row, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LinkContainer } from "react-router-bootstrap";

// assests import
import loginImage from "../assets/login-page.jpg";

// slices import
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlices";

// components import
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Header from "../components/Header";
// import ForgotPassword from "../components/ForgotPassword";

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
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Header />
      <Row className="px-5 pt-4 bodydiv">
        <Col className="col-lg-6 col-md-12 col-sm-12 col-xs-12 ">
          <Form className="p-4 border border-dark rounded mx-5 ">
            <h1 className="login-title">Login</h1>
            <Row className="py-3">
              <Col className="dont-have-acc">
                Doesn't have an account yet?
                <Link to="/register">
                  <span className="signupp">Signup</span>
                </Link>
              </Col>
            </Row>

            <Form onSubmit={submitHandler}>
              <Form.Group className="my-2" controlId="empId">
                <Form.Label className="form-label">Employee Id</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="1235"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="password">
                <div className="pwd">
                  <Form.Label className="form-label">Password</Form.Label>

                  {/* forgot passowrd */}
                  <Link to="/forgotpassword">
                    <span>Forgot Password?</span>
                  </Link>
                </div>

                <Form.Control
                  type="password"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {isLoading && <Loader />}

              <Button
                type="submit"
                style={{ color: "white", background: "#1B1A55", width: "100%" }}
                onClick={submitHandler}
                className="mt-3 login-btn"
              >
                Login
              </Button>
            </Form>
          </Form>
        </Col>
        <Col className="col-lg-6 col-md-12 col-sm-12 col-xs-12 pt-4 ">
          <img className="img-fluid" src={loginImage} alt="Login Page" />
        </Col>
      </Row>
    </>
  );
};

export default LoginScreen;
