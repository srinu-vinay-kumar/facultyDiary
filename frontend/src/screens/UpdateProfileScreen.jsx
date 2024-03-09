import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlices";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import Header from "../components/Header";

const UpdateProfileScreen = () => {
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

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setFirstName(userInfo.firstName);
    setMiddleName(userInfo.middleName);
    setLastName(userInfo.lastName);
    setEmpId(userInfo.empId);
    setClgMail(userInfo.clgMail);
    setClgName(userInfo.clgName);
    setDesignation(userInfo.designation);
    setDept(userInfo.dept);
    setQualification(userInfo.qualification);
    setExperience(userInfo.experience);
  }, [
    userInfo.setFirstName,
    userInfo.setMiddleName,
    userInfo.setLastName,
    userInfo.setEmpId,
    userInfo.setClgMail,
    userInfo.setClgName,
    userInfo.setDesignation,
    userInfo.setDept,
    userInfo.setQualification,
    userInfo.setExperience,
  ]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
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
        toast.success("Profile Update");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Header />
      <FormContainer>
        <h1>Update Profile</h1>

        <Form onSubmit={submitHandler}>
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
              type="text"
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
            <Form.Control
              type="text"
              placeholder="Enter your College Name"
              value={clgName}
              onChange={(e) => setClgName(e.target.value)}
            ></Form.Control>
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
            <Form.Control
              type="text"
              placeholder="Enter your  Department"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            ></Form.Control>
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
              type="text"
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
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UpdateProfileScreen;
