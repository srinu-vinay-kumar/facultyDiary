import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlices";
import "../styles/main.scss";
import profilePic from "../assets/profilePic.png";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const fullName = userInfo
    ? `${userInfo.firstName} ${userInfo.middleName} ${userInfo.lastName}`
    : ``;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
<<<<<<< HEAD
      <Navbar expand="lg" className="nav-bar navbar-dark py-4" fixed="top">
=======
  
      <Navbar  expand="lg" className="nav-bar navbar-dark py-4" fixed="top"  collapseOnSelect>
>>>>>>> 536055118085a1e3b37775d7348c21ace9ee32db
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="nav-title">Faculty Diary</Navbar.Brand>
          </LinkContainer>
<<<<<<< HEAD
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="navbar-toggler-white"
          />
=======
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler-white" />
>>>>>>> 536055118085a1e3b37775d7348c21ace9ee32db
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* {userInfo ? ( */}
                <>
<<<<<<< HEAD
                  <NavDropdown title="Diary ">
=======
                  <NavDropdown title="Diary " >
>>>>>>> 536055118085a1e3b37775d7348c21ace9ee32db
                    <NavDropdown.Item href="/diary" className="nav-text ">
                      Diary
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/schedule" className="nav-text">
                      Scheduler
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link href="/files" className="nav-text files">
                    Files
                  </Nav.Link>
<<<<<<< HEAD

                  <div className="d-flex p ">
                    <img
                      src={profilePic}
                      alt="Login Page"
                      style={{ height: "27px", width: "27px" }}
                    />

                    <NavDropdown id="username">
                      <NavDropdown.Item href="./home" className="nav-text">
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        onClick={logoutHandler}
                        className="nav-text"
                      >
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
=======
                 
                 
                 
        
                  <div className="d-flex p "><img   src={profilePic} alt="Login Page" style={{height:"27px",width:"27px"}}/>
                  
                  <NavDropdown title={fullName} id="username">
                  

                    <NavDropdown.Item href="./home" className="nav-text">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={logoutHandler}
                      className="nav-text"
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
>>>>>>> 536055118085a1e3b37775d7348c21ace9ee32db
                  </div>
                </>
              {/* ) : ( */}
                
              {/* )} */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
