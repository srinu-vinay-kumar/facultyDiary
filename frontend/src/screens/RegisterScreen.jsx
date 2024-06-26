// packages import
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Form, Row, Button, Col } from "react-bootstrap";

// components import
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlices";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import profilePic from "../assets/profilePic.png";
const RegisterScreen = () => {
  const [file, setFile] = useState("");
  // const [profilePicPreview, setProfilePicPreview] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [empId, setEmpId] = useState("");
  const [clgMail, setClgMail] = useState("");
  const [clgName, setClgName] = useState("");
  const [designation, setDesignation] = useState("");
  const [dept, setDept] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({
          file,
          firstName,
          middleName,
          lastName,
          empId,
          clgMail,
          clgName,
          designation,
          dept,
          qualification,
          experience,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/login");
        toast.success("Registered successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      <Form onSubmit={submitHandler}>
        {/* profilePic input */}
        {/* <Form.Group>
          <div className="profilePicture">
            <img
              src={file || profilePic}
              alt="upload your profile picture"
              className="profilepic"
            />
          </div>
          <Form.Control
            id="profile"
            type="file"
            accept="image/*"
            onChange={onUpload}
          />
        </Form.Group> */}
        {/* <Form.Group controlId="profilePicture">
          <img
            src={profilePicImage}
            alt="Profile Pic"
            className="profile-pic"
            onClick={() => document.getElementById("profilePicInput").click()} 
          />
          <Form.Control
            id="profilePicInput"
            type="file"
            onChange={handleProfilePictureChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </Form.Group>
 */}
        {/* 1. firstName */}
        <Form.Group className="my-2" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* 2. middleName */}
        <Form.Group className="my-2" controlId="middleName">
          <Form.Label>Middle Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Middle Name"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* 3. lastName */}
        <Form.Group className="my-2" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* 4. empId */}
        <Form.Group className="my-2" controlId="empId">
          <Form.Label>Employee ID</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your Employee ID"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* 5. clgMail */}
        <Form.Group className="my-2" controlId="clgMail">
          <Form.Label>College Mail</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your  College Email"
            value={clgMail}
            onChange={(e) => setClgMail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* 6. clgName */}
        <Form.Group className="my-2" controlId="clgName">
          <Form.Label>College Name</Form.Label>
          <Form.Select
            value={clgName}
            onChange={(e) => setClgName(e.target.value)}
          >
            <option value="" disabled>
              Select College Name
            </option>
            <option value="Aditya Engineering College">
              Aditya Engineering College
            </option>
            <option value="Adtiya College of Engineering & Technology">
              Aditya College of Engineering & Technology
            </option>
            <option value="Aditya College of Engineering">
              Aditya College of Engineering
            </option>
          </Form.Select>
        </Form.Group>

        {/* 7. designation */}
        <Form.Group className="my-2" controlId="designation">
          <Form.Label>Designation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* 8. dept */}
        <Form.Group className="my-2" controlId="dept">
          <Form.Label>Department</Form.Label>
          <Form.Select value={dept} onChange={(e) => setDept(e.target.value)}>
            <option value="" disabled>
              Select Department
            </option>
            <option value="CE">Civil Engineering</option>
            <option value="EEE">Electrical & Electronics Engineering</option>
            <option value="MECH">Mechanical Engineering</option>
            <option value="ECE">Electronics & Communication Engineering</option>
            <option value="CSE">Computer Science & Engineering</option>
            <option value="CSD">
              Computer Science & Engineering(Data Science)
            </option>
            <option value="IT">Information Technology</option>
            <option value="MIN">Mining Engineering</option>
            <option value="PT">Petroleum Engineering</option>
            <option value="AG">Agricultural Engineering</option>
            <option value="AIML">
              Artificial Intelligence & Machine Learning
            </option>
          </Form.Select>
        </Form.Group>

        {/* 9. qualification */}
        <Form.Group className="my-2" controlId="qualification">
          <Form.Label>Qualificaton</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your  Qualification"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* 10. experience */}
        <Form.Group className="my-2" controlId="experience">
          <Form.Label>Experience</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* 11. password */}
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* 12. confirmPassword */}
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="***********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {isLoading && <Loader />}

        <Button type="submit" variant="primary" className="mt-3">
          Sign Up
        </Button>

        <Row className="py-3">
          <Col>
            Already Have an Account <Link to="/login">Login?</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default RegisterScreen;
