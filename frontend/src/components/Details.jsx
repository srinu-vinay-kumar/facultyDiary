import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiSolidEditAlt } from "react-icons/bi";
import { setCredentials } from "../slices/authSlices";
import { usersApiSlice } from "../slices/usersApiSlice";

const Details = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const fullName = userInfo
    ? `${userInfo.firstName} ${userInfo.middleName} ${userInfo.lastName}`
    : ``;

  const navigate = useNavigate();

  const profileUpdate = async () => {
    try {
      await navigate("/profile-update");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <main>
        <Container fluid>
          <Row className=" contentbox">
            <div className="div1 col-lg-4 col-md-9 col-sm-9 col-xs-9">
              <BiSolidEditAlt onClick={profileUpdate} className="edit-icon" />
              <h5>{userInfo.empId}</h5>
              <h3>{fullName}</h3>
              <h6>
                {userInfo.designation}&nbsp;&nbsp;of&nbsp;&nbsp;
                {userInfo.dept}
              </h6>
            </div>
            <div className="div2 col-lg-4 col-md-9 col-sm-9 col-xs-9">
              <div className="profile_title">
                <h4>My Profile</h4>
              </div>
              <div className="profile_details">
                <h6>
                  College Mail ID : <span>{userInfo.clgMail}</span>
                </h6>
                <hr />
                <h6>
                  Department : <span>{userInfo.dept}</span>
                </h6>
                <hr />
                <h6>
                  Qualification : <span>{userInfo.qualification}</span>
                </h6>
                <hr />
                <h6>
                  Experience : <span>{userInfo.experience} Years</span>
                </h6>
                <hr />
                <h6>
                  College Name : <span>{userInfo.clgName}</span>
                </h6>
              </div>
            </div>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default Details;
