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
import ForgotPassword from "../components/ForgotPassword";

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
      <Row className="px-5 pt-4 bodydiv">
        <Col className="col-lg-6 col-md-12 col-sm-12 col-xs-12 ">
<<<<<<< HEAD
          <Form className="p-4 border border-dark rounded mx-5 ">
            <h1 style={{ color: "#1B1A55", fontWeight: "750" }}>Login</h1>
            <Row className="py-3">
              <Col style={{ fontWeight: "700" }}>
=======
          <Form  className="p-4 border border-dark rounded mx-5 ">
            <h1 style={{fontWeight:"600",color:"#1B1A55",fontWeight:"750"}}>Login</h1>
            <Row className="py-3">
              <Col style={{fontWeight:"700"}}>
>>>>>>> 536055118085a1e3b37775d7348c21ace9ee32db
                Doesn't have an account yet? <Link to="/register">Signup</Link>{" "}
              </Col>
            </Row>

            <Form onSubmit={submitHandler}>
              <Form.Group className="my-2" controlId="empId">
<<<<<<< HEAD
                <Form.Label style={{ fontWeight: "500", color: "black" }}>
                  Employee Id
                </Form.Label>
=======
                <Form.Label style={{fontWeight:"500",color:"black"}}>Employee Id</Form.Label>
>>>>>>> 536055118085a1e3b37775d7348c21ace9ee32db
                <Form.Control
                  type="number"
                  placeholder="1235"
                  value={empId}
                  onChange={(e) => setEmpId(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="password">
<<<<<<< HEAD
                <div className="pwd">
                  <Form.Label style={{ fontWeight: "500", color: "black" }}>
                    Password
                  </Form.Label>
                  <ForgotPassword />
                </div>
=======
                <div className="pwd" >
                <Form.Label style={{fontWeight:"500",color:"black"}}>Password</Form.Label>
                <Form.Label style={{fontWeight:"500",color:"black"}}>Forgot Password</Form.Label>
                </div>
                
>>>>>>> 536055118085a1e3b37775d7348c21ace9ee32db

                <Form.Control
                  type="password"
                  placeholder="*******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {isLoading && <Loader />}

<<<<<<< HEAD
              <Button
                type="submit"
                style={{ color: "white", background: "#1B1A55", width: "100%" }}
                onClick={submitHandler}
                className="mt-3 "
              >
=======
              <Button type="submit" style={{color:"white",background:"#1B1A55",width:"100%"}} className="mt-3 ">
>>>>>>> 536055118085a1e3b37775d7348c21ace9ee32db
                Login
              </Button>
            </Form>
          </Form>
        </Col>
        <Col className="col-lg-6 col-md-12 col-sm-12 col-xs-12 pt-4 ">
<<<<<<< HEAD
          <img className="img-fluid" src={loginImage} alt="Login Page" />
=======
          <img className="img-fluid" src={loginImage} alt="Login Page"/>
>>>>>>> 536055118085a1e3b37775d7348c21ace9ee32db
        </Col>
      </Row>
    </>
  );
};

export default LoginScreen;
