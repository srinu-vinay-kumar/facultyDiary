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
  
      <Navbar  expand="lg" className="nav-bar navbar-dark py-4" fixed="top"  collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="nav-title">Faculty Diary</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler-white" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* {userInfo ? ( */}
                <>
                  <NavDropdown title="Diary " >
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
